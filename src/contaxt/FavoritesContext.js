import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const FavoritesContext = createContext();

// Custom hook with error handling
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ 
  children, 
  maxItems = 100,
  storageKey = 'favorites' 
}) => {
  // Initialize state from localStorage with error handling
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(storageKey);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Save to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
      // You could trigger a notification here
    }
  }, [favorites, storageKey]);

  // Add to favorites with validation and limit
  const addToFavorites = useCallback((product) => {
    setFavorites(prevFavorites => {
      // Check if product already exists
      const exists = prevFavorites.some(item => item.id === product.id);
      if (exists) return prevFavorites;

      // Check if max items limit reached
      if (prevFavorites.length >= maxItems) {
        console.warn(`Maximum favorites limit (${maxItems}) reached`);
        // You could trigger a notification here
        return prevFavorites;
      }

      // Process image
      let image = product.image || '';
      if (Array.isArray(product.images) && product.images.length > 0) {
        image = product.images[0];
      } else if (typeof product.images === 'string') {
        image = product.images;
      }

      // Create favorite item with timestamp
      const newFavorite = {
        id: product.id,
        name: product.name || 'Unnamed Product',
        image: image || 'https://via.placeholder.com/300x300?text=No+Image',
        price: product.price || 0,
        sizes: product.sizes || [],
        sale: product.sale || { isOnSale: false },
        category: product.category || 'Uncategorized',
        rating: product.rating || 0,
        addedAt: Date.now() // For sorting by date added
      };

      return [...prevFavorites, newFavorite];
    });
  }, [maxItems]);

  // Remove from favorites
  const removeFromFavorites = useCallback((id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  }, []);

  // Toggle favorite (add if not exists, remove if exists)
  const toggleFavorite = useCallback((product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      
      if (exists) {
        // Remove from favorites
        return prev.filter(item => item.id !== product.id);
      } else {
        // Add to favorites
        if (prev.length >= maxItems) {
          console.warn(`Maximum favorites limit (${maxItems}) reached`);
          return prev;
        }

        let image = product.image || '';
        if (Array.isArray(product.images) && product.images.length > 0) {
          image = product.images[0];
        } else if (typeof product.images === 'string') {
          image = product.images;
        }

        const newFavorite = {
          id: product.id,
          name: product.name || 'Unnamed Product',
          image: image || 'https://via.placeholder.com/300x300?text=No+Image',
          price: product.price || 0,
          sizes: product.sizes || [],
          sale: product.sale || { isOnSale: false },
          category: product.category || 'Uncategorized',
          rating: product.rating || 0,
          addedAt: Date.now()
        };

        return [...prev, newFavorite];
      }
    });
  }, [maxItems]);

  // Check if product is favorite
  const isFavorite = useCallback((id) => {
    return favorites.some(item => item.id === id);
  }, [favorites]);

  // Get favorites count
  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  // Calculate total price of favorites (considering sale prices)
  const getFavoritesTotal = useCallback(() => {
    return favorites.reduce((total, item) => {
      const price = item.sale?.isOnSale && item.sale.salePrice 
        ? item.sale.salePrice 
        : item.price;
      return total + price;
    }, 0);
  }, [favorites]);

  // Clear all favorites with confirmation
  const clearFavorites = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
    }
  }, []);

  // Get all favorite IDs
  const getFavoriteIds = useCallback(() => {
    return favorites.map(item => item.id);
  }, [favorites]);

  // Get favorites by category
  const getFavoritesByCategory = useCallback((category) => {
    return favorites.filter(item => item.category === category);
  }, [favorites]);

  // Get recently added favorites
  const getRecentlyAdded = useCallback((limit = 5) => {
    return [...favorites]
      .sort((a, b) => b.addedAt - a.addedAt)
      .slice(0, limit);
  }, [favorites]);

  // Get favorite items with sale
  const getSaleItems = useCallback(() => {
    return favorites.filter(item => item.sale?.isOnSale);
  }, [favorites]);

  // Search favorites
  const searchFavorites = useCallback((searchTerm) => {
    const term = searchTerm.toLowerCase();
    return favorites.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.category?.toLowerCase().includes(term)
    );
  }, [favorites]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesCount,
    getFavoritesTotal,
    clearFavorites,
    toggleFavorite,
    getFavoriteIds,
    getFavoritesByCategory,
    getRecentlyAdded,
    getSaleItems,
    searchFavorites,
    lastUpdated
  }), [
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesCount,
    getFavoritesTotal,
    clearFavorites,
    toggleFavorite,
    getFavoriteIds,
    getFavoritesByCategory,
    getRecentlyAdded,
    getSaleItems,
    searchFavorites,
    lastUpdated
  ]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Styled component for favorites count badge
export const FavoritesCountBadge = ({ className, style }) => {
  const { getFavoritesCount } = useFavorites();
  const count = getFavoritesCount();
  
  const badgeStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  };

  const countStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '9999px',
    padding: '2px 6px',
    fontSize: '12px',
    minWidth: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div className={className} style={badgeStyle}>
      <span>❤️</span>
      {count > 0 && (
        <span style={countStyle}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

// Styled favorites list component
export const FavoritesList = ({ 
  onItemClick,
  showRemoveButton = true,
  maxHeight,
  emptyMessage = "Your favorites list is empty",
  className,
  style
}) => {
  const { favorites, removeFromFavorites } = useFavorites();

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    maxHeight: maxHeight || '400px',
    overflowY: 'auto',
    ...style
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    transition: 'all 0.2s ease',
    cursor: onItemClick ? 'pointer' : 'default'
  };

  const imageStyle = {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6'
  };

  const infoStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const nameStyle = {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  };

  const priceStyle = {
    margin: 0,
    fontSize: '14px',
    color: '#6b7280'
  };

  const salePriceStyle = {
    color: '#ef4444',
    fontWeight: '600'
  };

  const originalPriceStyle = {
    textDecoration: 'line-through',
    fontSize: '12px',
    marginLeft: '8px',
    color: '#9ca3af'
  };

  const removeButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#dc2626'
    }
  };

  const emptyStyle = {
    textAlign: 'center',
    padding: '32px',
    color: '#6b7280',
    fontSize: '14px'
  };

  if (favorites.length === 0) {
    return (
      <div className={className} style={containerStyle}>
        <div style={emptyStyle}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <div style={listStyle}>
        {favorites.map(item => (
          <div 
            key={item.id} 
            style={itemStyle}
            onClick={() => onItemClick && onItemClick(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
          >
            <img 
              src={item.image} 
              alt={item.name}
              style={imageStyle}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
              }}
            />
            <div style={infoStyle}>
              <h4 style={nameStyle}>{item.name}</h4>
              <p style={priceStyle}>
                {item.sale?.isOnSale ? (
                  <>
                    <span style={salePriceStyle}>${item.sale.salePrice}</span>
                    <span style={originalPriceStyle}>${item.price}</span>
                  </>
                ) : (
                  <span>${item.price}</span>
                )}
              </p>
              {item.category && (
                <span style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textTransform: 'capitalize'
                }}>
                  {item.category}
                </span>
              )}
            </div>
            {showRemoveButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(item.id);
                }}
                style={removeButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ef4444';
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Favorites summary component
export const FavoritesSummary = ({ className, style }) => {
  const { 
    favorites, 
    getFavoritesCount, 
    getFavoritesTotal,
    getSaleItems 
  } = useFavorites();
  
  const count = getFavoritesCount();
  const total = getFavoritesTotal();
  const saleItems = getSaleItems();

  const summaryStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    ...style
  };

  const titleStyle = {
    margin: '0 0 12px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#4b5563'
  };

  const totalStyle = {
    ...rowStyle,
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '2px solid #e5e7eb',
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  };

  return (
    <div className={className} style={summaryStyle}>
      <h3 style={titleStyle}>Favorites Summary</h3>
      <div style={rowStyle}>
        <span>Total Items:</span>
        <span style={{ fontWeight: '600' }}>{count}</span>
      </div>
      {saleItems.length > 0 && (
        <div style={rowStyle}>
          <span>Items on Sale:</span>
          <span style={{ fontWeight: '600', color: '#ef4444' }}>
            {saleItems.length}
          </span>
        </div>
      )}
      <div style={totalStyle}>
        <span>Total Value:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default FavoritesProvider;