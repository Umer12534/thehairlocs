import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart';

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getItemKey = (item) => `${item.id}::${item.size || ''}`;

const getSizeEntries = (sizes = {}) => Object.entries(sizes || {});

const getFirstAvailableSize = (sizes = {}) => {
  const firstInStock = getSizeEntries(sizes).find(([, value]) => toNumber(value?.stock) > 0);
  return firstInStock?.[0] || getSizeEntries(sizes)[0]?.[0] || '';
};

const getPriceForSize = (sizes = {}, size = '', fallbackPrice = 0) => {
  const sizeData = sizes?.[size];
  return toNumber(sizeData?.salePrice ?? sizeData?.price, toNumber(fallbackPrice));
};

const isSizeOutOfStock = (sizes = {}, size = '') => {
  if (!size || !sizes || Object.keys(sizes).length === 0) {
    return false;
  }

  return toNumber(sizes?.[size]?.stock) <= 0;
};

const normalizeCartItem = (item) => {
  const sizes = item?.sizes || {};
  const size = item?.size || getFirstAvailableSize(sizes);
  const outOfStock = isSizeOutOfStock(sizes, size);

  return {
    ...item,
    id: item?.id || '',
    image: item?.image || item?.images?.[0] || '',
    title: item?.title || item?.name || '',
    price: getPriceForSize(sizes, size, item?.price),
    qty: Math.max(1, toNumber(item?.qty, 1)),
    size,
    sizes,
    selected: outOfStock ? false : item?.selected ?? true
  };
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart.map(normalizeCartItem) : [];
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const cartSignature = cartItems.map(getItemKey).sort().join('|');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        const guestCart = localStorage.getItem(CART_STORAGE_KEY);
        const parsedCart = guestCart ? JSON.parse(guestCart) : [];
        setCartItems(Array.isArray(parsedCart) ? parsedCart.map(normalizeCartItem) : []);
        setIsAuthReady(true);
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(userRef);
        const firebaseCart = snapshot.exists() ? snapshot.data()?.cartItems : undefined;
        const localCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

        if (Array.isArray(firebaseCart)) {
          setCartItems(firebaseCart.map(normalizeCartItem));
        } else {
          const normalizedLocalCart = Array.isArray(localCart) ? localCart.map(normalizeCartItem) : [];
          setCartItems(normalizedLocalCart);
          await setDoc(
            userRef,
            {
              cartItems: normalizedLocalCart,
              updatedAt: serverTimestamp()
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.error('Error loading cart from Firebase:', error);
      } finally {
        setIsAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const persistCart = async () => {
      if (!currentUser) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        return;
      }

      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            cartItems,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
      } catch (error) {
        console.error('Error saving cart to Firebase:', error);
      }
    };

    persistCart();
  }, [cartItems, currentUser, isAuthReady]);

  useEffect(() => {
    const syncCartItems = async () => {
      if (cartItems.length === 0) return;

      const uniqueIds = [...new Set(cartItems.map((item) => item.id).filter(Boolean))];
      if (uniqueIds.length === 0) return;

      try {
        const productSnapshots = await Promise.all(
          uniqueIds.map(async (id) => {
            const snapshot = await getDoc(doc(db, 'products', id));
            return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
          })
        );

        const productsById = new Map(
          productSnapshots.filter(Boolean).map((product) => [product.id, product])
        );

        setCartItems((prevItems) => {
          let hasChanges = false;

          const nextItems = prevItems.map((item) => {
            const product = productsById.get(item.id);
            if (!product) {
              return normalizeCartItem(item);
            }

            const sizes = product.sizes || item.sizes || {};
            const nextPrice = getPriceForSize(sizes, item.size, item.price);
            const nextImage = Array.isArray(product.images)
              ? product.images[0]
              : Array.isArray(product.image)
                ? product.image[0]
                : product.image || item.image || '';
            const outOfStock = isSizeOutOfStock(sizes, item.size);
            const normalizedItem = normalizeCartItem({
              ...item,
              image: nextImage,
              title: product.name || item.title,
              price: nextPrice,
              sizes,
              selected: outOfStock ? false : item.selected
            });

            if (JSON.stringify(normalizedItem) !== JSON.stringify(item)) {
              hasChanges = true;
            }

            return normalizedItem;
          });

          return hasChanges ? nextItems : prevItems;
        });
      } catch (error) {
        console.error('Error syncing cart products:', error);
      }
    };

    syncCartItems();
  }, [cartItems, cartSignature]);

  /*TOTAL PRICE (FIXED) */
  const calculateTotal = (selectedOnly = false) => {
    return cartItems.reduce((total, item) => {
      if (selectedOnly && !item.selected) {
        return total;
      }

      return total + item.price * item.qty;
    }, 0);
  };

  const getSelectedCartItems = () => cartItems.filter((item) => item.selected);

  const getCheckoutItems = () =>
    cartItems.filter((item) => item.selected && !isSizeOutOfStock(item.sizes, item.size));

  /*  ADD TO CART (FIXED PRICE) */
  const addToCart = (product, selectedSize = '20ml', quantity = 1) => {
    setCartItems(prevItems => {
      const sizes = product?.sizes || {};
      const normalizedSize = selectedSize || getFirstAvailableSize(sizes);
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === normalizedSize
      );

      const finalPrice = getPriceForSize(
        sizes,
        normalizedSize,
        product.price ?? product.salePrice ?? product.originalPrice ?? 0
      );
      const firstImage = Array.isArray(product.image)
        ? product.image[0]
        : (product.image || product.images?.[0] || "");
      const outOfStock = isSizeOutOfStock(sizes, normalizedSize);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const stock = toNumber(sizes?.[normalizedSize]?.stock, 0);
        const nextQty = existingItem.qty + quantity;

        updatedItems[existingItemIndex] = normalizeCartItem({
          ...existingItem,
          image: firstImage || existingItem.image,
          title: product.name || existingItem.title,
          price: finalPrice,
          qty: outOfStock ? nextQty : (stock > 0 ? Math.min(nextQty, stock) : nextQty),
          sizes: Object.keys(sizes).length > 0 ? sizes : existingItem.sizes,
          selected: outOfStock ? false : existingItem.selected
        });

        return updatedItems;
      }

      return [
        ...prevItems,
        normalizeCartItem({
          id: product.id,
          image: firstImage,
          title: product.name,
          price: finalPrice,
          qty: quantity,
          size: normalizedSize,
          sizes,
          selected: !outOfStock
        })
      ];
    });
  };

  const removeFromCart = (id, size = '') => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id, size = '', newQty) => {
    if (newQty < 1) {
      removeFromCart(id, size);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size
          ? {
              ...item,
              qty: item.sizes?.[size]?.stock > 0
                ? Math.min(newQty, toNumber(item.sizes?.[size]?.stock, newQty))
                : newQty
            }
          : item
      )
    );
  };

  const changeItemSize = (id, oldSize, newSize) => {
    setCartItems(prev => {
      // Find current item
      const currentItem = prev.find(
        item => item.id === id && item.size === oldSize
      );

      if (!currentItem) return prev;

      const nextPrice = getPriceForSize(currentItem.sizes, newSize, currentItem.price);
      const outOfStock = isSizeOutOfStock(currentItem.sizes, newSize);

      // Check if same product with new size already exists
      const existingItem = prev.find(
        item => item.id === id && item.size === newSize
      );

      // Remove old item
      let updatedCart = prev.filter(
        item => !(item.id === id && item.size === oldSize)
      );

      if (existingItem) {
        // Merge quantities
        updatedCart = updatedCart.map(item =>
          item.id === id && item.size === newSize
            ? normalizeCartItem({
                ...item,
                price: nextPrice,
                qty: item.qty + currentItem.qty,
                selected: outOfStock ? false : item.selected
              })
            : item
        );
      } else {
        // Add item with new size
        updatedCart.push(normalizeCartItem({
          ...currentItem,
          size: newSize,
          price: nextPrice,
          selected: outOfStock ? false : true
        }));
      }

      return updatedCart;
    });
  };

  const toggleItemSelection = (id, size = '', selected) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id || item.size !== size || isSizeOutOfStock(item.sizes, item.size)) {
          return item;
        }

        return { ...item, selected };
      })
    );
  };

  const toggleAllSelections = (selected) => {
    setCartItems((prev) =>
      prev.map((item) =>
        isSizeOutOfStock(item.sizes, item.size)
          ? { ...item, selected: false }
          : { ...item, selected }
      )
    );
  };

  const clearPurchasedItems = () => {
    setCartItems((prev) => prev.filter((item) => !item.selected));
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
        getCartCount,
        changeItemSize,
        toggleItemSelection,
        toggleAllSelections,
        getSelectedCartItems,
        getCheckoutItems,
        clearPurchasedItems,
        isSizeOutOfStock,
        getFirstAvailableSize
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
