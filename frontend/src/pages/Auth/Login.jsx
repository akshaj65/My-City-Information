import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userAction';
import '../../styles/auth.css';
import Swal from "sweetalert2";

const Login = ({ isActive, isLogin }) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") {
      setPassword(value);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    
    console.log('Login clicked');
   
    console.log(isLogin, 'login');
  };
  return (
    <form className={isActive ? 'login' : 'login none'} action="" >
      <div className="formGroup">
        <input
          type="email"
          id='email'
          placeholder="Email ID"
          name="email"
          value={email}
          required
          autoComplete="off"
          onChange={registerDataChange}
        />
      </div>
      <div className="formGroup">
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          autoComplete="off"
          onChange={registerDataChange}
        />
      </div>
      <div className="checkBox">
        <input type="checkbox" name="checkbox" id="checkBox" />
        <span className="text">Keep me signed in on this device</span>
      </div>
      <div className="formGroup">
        <button type="button" className="btn2" onClick={handleLogin} disabled={(email&&password)?false:true}>Log In</button>
      </div>
    </form>
  );
};


export default Login;