import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contaxt/FavoritesContext';
import { useCart } from '../contaxt/CartContaxt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/button/Button';
import './Favorites.css';

function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart, getFirstAvailableSize } = useCart();

  const handleAddToCart = (product) => {
    const defaultSize = getFirstAvailableSize(product.sizes || {});
    
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        sizes: product.sizes || {},
      },
      defaultSize,
      1
    );
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>Your favorites list is empty</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="favorites-actions">
            <button className="clear-favorites-btn" onClick={clearFavorites}>
              Clear All
            </button>
          </div>

          <div className="favorites-grid">
            {favorites.map(product => (
              <div key={product.id} className="favorite-item">
                <button 
                  className="remove-favorite-btn"
                  onClick={() => removeFromFavorites(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                <Link to={`/product/${product.id}`} className="favorite-item-link">
                  <div className="favorite-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="favorite-item-content">
                    <h3>{product.name}</h3>
                    {product.category && (
                      <p className="favorite-item-category">{product.category}</p>
                    )}
                    <p className="favorite-item-price">PKR {product.price}</p>
                  </div>
                </Link>

                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
