import AdminLayout from "../components/layout/AdminLayout";

export default function Dashboard() {
  return (
    <>
    
      <h1 className="page-title">Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Total Products</h3>
          <p className="card-value">120</p> {/* Replace with dynamic Firebase value */}
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p className="card-value">75</p> {/* Replace with dynamic Firebase value */}
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p className="card-value">$15,200</p> {/* Replace with dynamic Firebase value */}
        </div>
      </div>
    </>
  );
}
