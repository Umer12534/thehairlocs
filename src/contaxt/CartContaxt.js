import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart';

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
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        const guestCart = localStorage.getItem(CART_STORAGE_KEY);
        setCartItems(guestCart ? JSON.parse(guestCart) : []);
        setIsAuthReady(true);
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(userRef);
        const firebaseCart = snapshot.exists() ? snapshot.data()?.cartItems : undefined;
        const localCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

        if (Array.isArray(firebaseCart)) {
          setCartItems(firebaseCart);
        } else {
          setCartItems(localCart);
          await setDoc(
            userRef,
            {
              cartItems: localCart,
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

  /*TOTAL PRICE (FIXED) */
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  /*  ADD TO CART (FIXED PRICE) */
  const addToCart = (product, selectedSize = '20ml', quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === selectedSize
      );

      const finalPrice = Number(
        product.price ?? product.salePrice ?? product.originalPrice ?? 0
      );
      const firstImage = Array.isArray(product.image)
        ? product.image[0]
        : (product.image || product.images?.[0] || "");

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].qty += quantity;
        return updatedItems;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          image: firstImage,
          title: product.name,
          price: finalPrice,
          qty: quantity,
          size: selectedSize
        }
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
          ? { ...item, qty: newQty }
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
            ? { ...item, qty: item.qty + currentItem.qty }
            : item
        );
      } else {
        // Add item with new size
        updatedCart.push({
          ...currentItem,
          size: newSize
        });
      }

      return updatedCart;
    });
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
        changeItemSize
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
