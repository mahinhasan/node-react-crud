import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingUp from './components/SignUp.js';
import PrivateRoute from './components/privateRoute.js';
import Login from './components/Login.js';
import AddProduct from './components/ProductAdd.js';
import AllProducts from './components/AllProducts.js';
import UpdateProduct from './components/UpdateProduct.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateRoute/>}>

        <Route path='/' element={<AllProducts/>} />
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/profile' element={<h1>User profile</h1>}/>
        <Route path='/logout' element={<h1>Logout Herer</h1>}/>
        </Route>
      
        <Route path='/signup' element={<SingUp/>}/>
        <Route path='/login' element={<Login/>}/>
     


      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
