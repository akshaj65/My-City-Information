import React from 'react'
import '../../styles/auth.css'
function Signup({isActive}) {
  return (
    
          <form className={isActive?'signup':"signup none"}>
            <div className="formGroup">
              <input
                type="text"
                id="UserName"
                placeholder="User Name"
                autoComplete="off"
              />
            </div>
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
            <div className="formGroup">
              <input
                type="password"
                id="confirm password"
                placeholder="Confirm Password"
                required
                autoComplete="off"
              />
            </div>
            <div className="checkBox">
              <input type="checkBox" name="checkBox" id="checkBox" />
              <span className="text">I agree with terms & conditions</span>
            </div>
            <div className="formGroup">
              <button type="button" className="btn2">Register</button>
            </div>
          </form>
          
  )
}

export default Signup;