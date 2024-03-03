import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    let navigate = useNavigate();

    const loginHandle = async () => {
        let result = await fetch('http://localhost:5000/login/', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);

        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        } else {
            alert("Please Enter valid Email and Password");
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <hr />
            <div className="signup-form">
                <br />
                <input type="text" className="inputBox" placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)} value={email}
                />
                <br />
                <br />
                <input type="password" className="inputBox" placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)} value={password}
                />
                <br />
                <br />
                <button onClick={loginHandle} type="button">Login</button>
                <div className="register-link">
                <p>Not registered yet? <Link to="/signup">Register here</Link></p>
            </div>
            </div>

        </div>
    );
};

export default Login;
