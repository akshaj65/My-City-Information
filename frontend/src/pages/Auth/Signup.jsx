import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { register } from '../../actions/userAction';
import '../../styles/auth.css'


function Signup({ isActive, isRegistered }) {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const registerDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email, "login test");
    if (passwordMatch) {
      // const myform = new FormData();
      // myform.set("name", name);
      // myform.set("email", email);
      // myform.set("password", password);
      dispatch(register(name, email, password))
      console.log('SignUp form submitted');
      // if (isRegistered) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: `<strong>Registration Completed</strong>`,
      //     confirmButtonText: 'OK'
      //   });
      // }
      // console.log(isRegistered, 'SignupPage inside');
    }
  };
  // console.log(isRegistered, 'SignupPage');

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordMatch(value === password); // Compare with password value
  };

  return (

    <form className={isActive ? 'signup' : "signup none"}>
      <div className="formGroup">
        <input
          type="text"
          name='name'
          id="UserName"
          placeholder="User Name"
          autoComplete="off"
          value={name}
          onChange={registerDataChange}
        />
      </div>
      <div className="formGroup">
        <input
          type="email"
          placeholder="Email ID"
          id='email'
          name='email'
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
          name="password"
          value={password}
          placeholder="Password"
          required
          autoComplete="off"
          onChange={registerDataChange}
        />
      </div>
      <div className="formGroup">
        <input
          type="password"
          id="confirm password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          autoComplete="off"
          onChange={handleConfirmPasswordChange}
        />

      </div>
      {!passwordMatch && (
        <p className="signup-errorText" style={{ color: "red", fontSize: "14px", textAlign: "center" }}>Passwords do not match</p>
      )}
      <div className="checkBox">
        <input type="checkBox" name="checkBox" id="checkBox" />
        <span className="text">I agree with terms & conditions</span>
      </div>
      <div className="formGroup">
        <button type="button" className="btn2" onClick={handleRegister}>Register</button>
      </div>
    </form>

  )
}

export default Signup;