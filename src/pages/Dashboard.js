import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import "../styles/admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faMoneyBillWave, faTags, faWarehouse } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [products, setProducts] = useState([]);
  const colectionRef = collection(db, "products");

  useEffect(() => {
      const getProducts = async () => {
      try{
        const data = await getDocs(colectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setProducts(filteredData);
      } catch(err){
        console.log(err);
      }
      
    }
    getProducts()

    setStats({
      totalProducts: products.length,
      totalCategories: [...new Set(products.map(p => p.category))].length,
      totalStock: products.reduce((sum, product) => {
      const sizes = product.sizes || {};
      return sum + Object.values(sizes).reduce((sizeSum, size) => sizeSum + (size.stock || 0), 0);}, 0),

      orders: null,
      users: null,
      revenue: 185000,
    });
  }, [products]);

  

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* STATS CARDS */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3><FontAwesomeIcon icon={faBox} /> Total Products</h3>
          <p className="value">{stats.totalProducts}</p>
        </div>
        <div className="stat-card blue">
          <h3><FontAwesomeIcon icon={faTags} /> Categories</h3>
          <p className="value">{stats.totalCategories}</p>
        </div>
        <div className="stat-card orange">
          <h3><FontAwesomeIcon icon={faWarehouse} /> Total Stock</h3>
          <p className="value">{stats.totalStock}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <ul>
          <li>New order placed</li>
          <li>Product added</li>
          <li>New user registered</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
