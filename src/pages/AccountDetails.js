import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useCart } from '../contaxt/CartContaxt';
import { useFavorites } from '../contaxt/FavoritesContext';
import '../styles/Account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faIdCard, faCalendar,
  faEnvelope, faFingerprint, faShield, faClock, faCalendarPlus,
  faHourglass1
} from '@fortawesome/free-solid-svg-icons';
import {Helmet} from 'react-helmet'

const AccountDetails = () => {
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ orders: 0, cartCount: 0, favoritesCount: 0 });
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { favorites }    = useFavorites();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) { navigate('/login'); return; }
      try {
        setLoading(true);
        setError('');
        const userRef  = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const d = userSnap.data();
          setUser({
            ...currentUser, ...d,
            displayName: currentUser.displayName || d.name || 'User',
            joinedDate:  d.createdAt?.toDate ? d.createdAt.toDate() : new Date(),
            lastActive:  d.updatedAt?.toDate ? d.updatedAt.toDate() : new Date(),
          });
        } else {
          setUser({
            ...currentUser,
            displayName: currentUser.displayName || 'User',
            joinedDate: new Date(),
            lastActive: new Date(),
            role: 'user',
          });
        }
        const ordersSnap = await getCountFromServer(
          query(collection(db, 'orders'), where('userId', '==', currentUser.uid))
        );
        setStats({
          orders: ordersSnap.data().count,
          cartCount: getCartCount(),
          favoritesCount: favorites ? favorites.length : 0,
        });
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data. Please refresh.');
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate, getCartCount, favorites]);

  if (loading) return (
    <div className="profile-page-wrapper">
      <div className="loading-profile">
        <FontAwesomeIcon icon={faUser} spin size="lg" />
        <p>Loading profile…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="profile-page-wrapper">
      <div className="error-message"><strong>Error:</strong> {error}</div>
    </div>
  );

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const fmt = (date, opts) => date.toLocaleDateString('en-US', opts);

  /* initials for avatar */
  const initials = (user.displayName || 'U')
    .split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      <Helmet>
        <title>Account Details | My Hair Locs</title>
        <meta 
          name='description' 
          content='View and manage your account details.' 
        />
        <meta
          name='keywords'
          content='account details, user profile, My Hair Locs account, customer account'
        />
      </Helmet>

      <div className="profile-page-wrapper">
        <div className="profile-card">

          {/* ── Banner + Avatar ── */}
          <div className="profile-banner">
            <div className="profile-avatar">
              <span className="avatar-initials">{initials}</span>
            </div>
          </div>

          {/* ── Identity ── */}
          <div className="profile-identity">
            <h2 className="profile-name">{user.displayName}</h2>
            <span className={`profile-role-badge${isAdmin ? ' admin' : ''}`}>
              <FontAwesomeIcon icon={faShield} />
              {isAdmin ? 'Admin Account' : 'Customer Account'}
            </span>
          </div>

          {/* ── Stats Row ── */}
          <div className="profile-stats-row">
            <div className="stat-pill">
              <span className="stat-pill-number">{stats.orders}</span>
              <span className="stat-pill-label">Orders</span>
            </div>
            <div className="stat-pill-divider" />
            <div className="stat-pill">
              <span className="stat-pill-number">{stats.cartCount}</span>
              <span className="stat-pill-label">In Cart</span>
            </div>
            <div className="stat-pill-divider" />
            <div className="stat-pill">
              <span className="stat-pill-number">{stats.favoritesCount}</span>
              <span className="stat-pill-label">Favorites</span>
            </div>
          </div>

          {/* ── Details Grid ── */}
          <div className="profile-details">

            <div className="detail-section">
              <p className="detail-section-label">
                <FontAwesomeIcon icon={faIdCard} /> Account information
              </p>
              <div className="detail-row">
                <span className="detail-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                <div className="detail-text">
                  <span className="detail-key">Email address</span>
                  <span className="detail-val">{user.email}</span>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon"><FontAwesomeIcon icon={faFingerprint} /></span>
                <div className="detail-text">
                  <span className="detail-key">User ID</span>
                  <span className="detail-val mono">{user.uid.slice(0, 12)}…</span>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon"><FontAwesomeIcon icon={faShield} /></span>
                <div className="detail-text">
                  <span className="detail-key">Account role</span>
                  <span className="detail-val capitalize">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <p className="detail-section-label">
                <FontAwesomeIcon icon={faCalendar} /> Account activity
              </p>
              <div className="detail-row">
                <span className="detail-icon"><FontAwesomeIcon icon={faCalendarPlus} /></span>
                <div className="detail-text">
                  <span className="detail-key">Member since</span>
                  <span className="detail-val">
                    {fmt(user.joinedDate, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon"><FontAwesomeIcon icon={faClock} /></span>
                <div className="detail-text">
                  <span className="detail-key">Last active</span>
                  <span className="detail-val">
                    {fmt(user.lastActive, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
