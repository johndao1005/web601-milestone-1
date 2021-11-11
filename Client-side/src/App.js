import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CategoryPage from './screens/CategoryPage/CategoryPage';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route,Routes} from 'react-router-dom'
import RegisterPage from './screens/RegisterPage/RegisterPage';
import LoginPage from './screens/LoginPage/LoginPage';
import AboutPage from './screens/AboutPage/AboutPage';
import AdminPage from './screens/AdminPage/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
        <Route path='/' element={<LandingPage/>} exact={true}/>
        <Route path='/about' element={<AboutPage/>} exact={true}/>
        <Route path='/login' element={<LoginPage/>} exact={true}/>
        <Route path='/register' element={<RegisterPage/>} exact={true}/>
        <Route path='/category' element={<CategoryPage/>} exact={true}/>
        <Route path='/admin' element={<AdminPage/>} exact={true}/>
        
        </Routes>
        
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
