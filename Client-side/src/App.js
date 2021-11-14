import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import { Route,Router} from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import CartPage from './Pages/CartPage/CartPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage';
import PaymentPage from './Pages/PaymentPage/PaymentPage';
import ShippingPage from './Pages/ShippingPage/ShippingPage';
import OrderPage from './Pages/OrderPage/OrderPage';

//Admin side
import OrderListPage from './Pages/OrderListPage/OrderListPage';
import ProductListPage from './Pages/ProductListPage/ProductListPage';
import UserListPage from './Pages/UserListPage/UserListPage';
import UserEditPage from './Pages/UserEditPage/UserEditPage';
import ProductEditPage from './Pages/ProductEditPage/ProductEditPage';
// import AdminPage from './Pages/AdminPage/AdminPage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header/>
      <main>
      <Container>
          <Route path='/order/:id' component={OrderPage} />
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
          <Route path='/admin/orderlist' component={OrderListPage} />
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
