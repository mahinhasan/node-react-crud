import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("userInfo");
  const loginUser = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    if (!loginUser) {
      navigate('/login'); 
    }
  };
  
  if (!loginUser) {
    return <Navigate to="/login" />;
  }

  return (
    <nav className='navbar'>
      <div className="logo-container">
      
        <h1 className="brand-name">Hungry</h1>
      </div>
      {loginUser ? (
        <ul className='nav-ul'>
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Product</Link>
          </li>
          {/* <li>
            <Link to={"/update"}>Update Product</Link>
          </li> */}
          <ul className='nav-right'>
            <li>
              <span className="username">{JSON.parse(loginUser).name}</span>
            </li>
            <li>
              <Link onClick={logout} to={"/"}>Logout</Link>
            </li>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          </ul>
        </ul>
      ) : (
        <ul className='nav-right'>
          {!auth && (
            <>
              <li><Link to={"/signup"}>Register</Link></li>
              <li><Link to={"/login"}>Login</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
