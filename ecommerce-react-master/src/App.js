import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/contacto' element={<Contact />} />
            <Route path='/category/:category' element={<ItemListContainer />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter >
    </CartProvider>
  );
}

export default App;
