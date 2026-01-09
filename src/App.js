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
import WhatsappIcon from './components/ui/whatsappChat/WhatsappIcon';
import BacktoTop from './components/ui/backTotop/BacktoTop';
import About from './pages/About'
import { CartProvider } from './contaxt/CartContaxt';
import Checkout from './pages/Checkout';


function App() {
  return (
    <>
    <CartProvider>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/sale" element={<Sale />} />
            <Route path='/About' element={<About />} />
            <Route path='/checkout' element={<Checkout />} />

          </Routes>
          <Footer/>
        <WhatsappIcon />
        <BacktoTop />
      </Router>
    </CartProvider>
    </>
  );
}

export default App;
