import React, { useState } from 'react';
import '../../styles/auth.css';

const Login = ({isActive}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic with email and password
    console.log('Login clicked');
  };

  return (
      <form className={isActive?'login':'login none'} action="" >
        <div className="formGroup">
          <input
            type="email"
            placeholder="Email ID"
            name="email"
            required
            autoComplete="off"
          />
        </div>
        <div className="formGroup">
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            autoComplete="off"
          />
        </div>
        <div className="checkBox">
          <input type="checkbox" name="checkbox" id="checkBox" />
          <span className="text">Keep me signed in on this device</span>
        </div>
        <div className="formGroup">
          <button type="button" className="btn2">Log In</button>
        </div>
      </form>
  );
};


export default Login;