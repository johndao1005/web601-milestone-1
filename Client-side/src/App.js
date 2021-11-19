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
import ProfilePage from './screens/ProfilePage/ProfilePage';
import CartPage from './screens/CartPage/CartPage';
import ProductListPage from './screens/AdminPage/ListPages/ProductListPage';
import OrderListPage from './screens/AdminPage/ListPages/OrderListPage';
import UserListPage from './screens/AdminPage/ListPages/UserListPage';
import ProductEditPage from './screens/AdminPage/EditPages/ProductEditPage';
import OrderEditPage from './screens/AdminPage/EditPages/OrderEditPage';
import UserEditPage from './screens/AdminPage/EditPages/UserEditPage';
import ProductCreatePage from './screens/AdminPage/CreatePages/ProductCreatePage';

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
          <Route path='/admin/order' element={<OrderListPage />} exact={true} />
          <Route path='/admin/order/:id/edit' element={<OrderEditPage />} exact={true} />
          <Route path='/admin/user' element={<UserListPage />} exact={true} />
          <Route path='/admin/user/:id/edit' element={<UserEditPage />} exact={true} />
          <Route path='/admin/product' element={<ProductListPage />} exact={true} />
          <Route path='/admin/product/create' element={<ProductCreatePage />} exact={true} />
          <Route path='/admin/product/:id/edit' element={<ProductEditPage />} exact={true} />
          <Route path='/cart/:id' element={<CartPage />}/>
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/profile' element={<ProfilePage />} />
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
