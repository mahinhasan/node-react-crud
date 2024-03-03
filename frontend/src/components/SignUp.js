import React, { useState, useEffect } from 'react';
import './SignUp.css'; 
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigateHome = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("userInfo");
    if (auth) {
      navigateHome('/');
    }
  });

  const collectData = async () => {
    let result =  await fetch('http://localhost:5000/register/',{
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();

    localStorage.setItem("userInfo", JSON.stringify(result));
    if (result) {
      navigateHome("/");
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign up</h2> 
      <hr/>

      <div className="signup-form">
        <label>
          First Name:
          <input
            type="text"
            className="inputBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="gmail"
            className="inputBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button onClick={collectData} type="button">Sign Up</button>
        <p>Already registered? <Link to="/login">Go to Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
