import React, { useEffect, useMemo, useState } from "react";
import {Helmet} from 'react-helmet'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/admin.css";

const formatDate = (value) => {
  if (!value) return "N/A";

  try {
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleString();
    }

    return new Date(value).toLocaleString();
  } catch {
    return "N/A";
  }
};

const getDateValue = (value) => {
  if (!value) return 0;

  try {
    if (typeof value.toDate === "function") {
      return value.toDate().getTime();
    }

    return new Date(value).getTime();
  } catch {
    return 0;
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const snapshot = await getDocs(collection(db, "users"));

        const allUsers = snapshot.docs
          .map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              email: data.email || "No email",
              role: data.role || "user",
              createdAt: data.createdAt || null,
              updatedAt: data.updatedAt || null,
            };
          })
          .sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt));

        setUsers(allUsers);
      } catch {
        setError("Unable to load registered users right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.role.toLowerCase().includes(normalizedSearch) ||
        user.id.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchTerm, users]);

  return (
    <>
      <Helmet>
        <title>Users | My Hair Locs</title>
        <meta 
          name='description' 
          content='View and manage user accounts in the My Hair Locs admin panel.' 
        />
        <meta
          name='keywords'
          content='users, customer accounts, admin users, My Hair Locs admin'
        />
      </Helmet>
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Registered Users</h1>
          <p className="admin-subtitle">All accounts saved in the Firebase users collection.</p>
        </div>

        <div className="admin-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search by email, role, or user id"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="users-summary-card">
        <span>Total Registered Users</span>
        <strong>{loading ? "..." : filteredUsers.length}</strong>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>User ID</th>
              <th>Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="users-table-message">
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="users-table-message users-table-message-error">
                  {error}
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="users-table-message">
                  No registered users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="user-email-cell">{user.email}</td>
                  <td>
                    <span
                      className={
                        user.role === "admin" ? "role-badge role-badge-admin" : "role-badge role-badge-user"
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="user-id-cell">{user.id}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Users;
