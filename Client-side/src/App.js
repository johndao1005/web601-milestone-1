import React from 'react'
import { Container } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Route,Router} from 'react-router-dom'
//import components
import Footer from './components/Footer';
import Header from './components/Header';

//general pages
//import CategoryPage from './screens/CategoryPage/CategoryPage';
//import AboutPage from './screens/AboutPage/AboutPage';
import LandingPage from './screens/LandingPage/LandingPage';
// import RegisterPage from './screens/RegisterPage/RegisterPage';
// import LoginPage from './screens/LoginPage/LoginPage';
// import ProductPage from './screens/ProductPage/ProductPage';

// //user pages
// import CartPage from './screens/CartPage/CartPage';
// import ProfilePage from './screens/ProfilePage/ProfilePage';
// import PlaceOrderPage from './screens/PlaceOrderPage/PlaceOrderPage';
// import PaymentPage from './screens/PaymentPage/PaymentPage';
// import ShippingPage from './screens/ShippingPage/ShippingPage';
// import OrderPage from './screens/OrderPage/OrderPage';

// //Admin side
// import OrderListPage from './screens/OrderListPage/OrderListPage';
// import ProductListPage from './screens/ProductListPage/ProductListPage';
// import UserListPage from './screens/UserListPage/UserListPage';
// import UserEditPage from './screens/UserEditPage/UserEditPage';
// import ProductEditPage from './screens/ProductEditPage/ProductEditPage';
// // import AdminPage from './screens/AdminPage/AdminPage';

function App() {
  return (
    <Router>
      <Header/>
      <main>
      <Container>
          {/* <Route path='/order/:id' component={OrderPage} />
          <Route path='/shipping' component={ShippingPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/placeorder' component={PlaceOrderPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/admin/userlist' component={UserListPage} />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route
            path='/admin/productlist'
            component={ProductListPage}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListPage}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditPage} />
          <Route path='/admin/orderlist' component={OrderListPage} /> */}
          <Route path='/search/:keyword' component={LandingPage} exact />
          <Route path='/page/:pageNumber' component={LandingPage} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={LandingPage}
            exact
          />
          <Route path='/' component={LandingPage} exact />
        </Container>
        
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
