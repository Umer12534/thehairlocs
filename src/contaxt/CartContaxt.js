import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /* ✅ TOTAL PRICE (FIXED) */
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  /* ✅ ADD TO CART (FIXED PRICE) */
  const addToCart = (product, selectedSize = '20ml', quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === selectedSize
      );

      const finalPrice = product.salePrice ?? product.originalPrice;

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].qty += quantity;
        return updatedItems;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          image: product.image[0],
          title: product.name,
          price: Number(finalPrice), // ✅ NUMBER ONLY
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
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
