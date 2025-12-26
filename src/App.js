import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home'
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Product from './pages/Products';
import Sale from './pages/Sale';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/layout/Footer/Footer';
// import ProductDetails './pages/ProductDetails';


function App() {
  return (
    <>
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Products" element={<Product />} />
          <Route path="/sale" element={<Sale />} />
          <Route path='/ProductDetails' element={<ProductDetails />} />

        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
