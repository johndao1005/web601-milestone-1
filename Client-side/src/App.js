import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './screens/RegisterPage/RegisterPage';
import LoginPage from './screens/LoginPage/LoginPage';
// import CategoryPage from './screens/CategoryPage/CategoryPage';
// import AboutPage from './screens/AboutPage/AboutPage';
import AdminPage from './screens/AdminPage/AdminPage';
import ProductPage from './screens/ProductPage/ProductPage';
import CartPage from './screens/CartPage/CartPage';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} exact={true} />
          <Route path='/login' element={<LoginPage />} exact={true} />
          <Route path='/register' element={<RegisterPage />} exact={true} />
          <Route path='/admin' element={<AdminPage />} exact={true} />
          <Route path='/cart/:id' element={<CartPage />} exact={true} />
          <Route path='/product/:id' element={<ProductPage />} />
          {/* <Route path='/about' element={<AboutPage/>} exact={true}/>
        <Route path='/cart' element={<CartPage/>} exact={true}/>
        <Route path='/category' element={<CategoryPage/>} exact={true}/> */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
