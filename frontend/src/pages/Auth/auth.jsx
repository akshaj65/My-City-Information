import React from 'react'
import { useState } from 'react'
import NavBar from '../../components/NavBar'
import Login from './Login'
import Signup from './Signup'
const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const handleSignUpClick = () => {
        setIsSignUp(true);
      };
    
      const handleLoginClick = () => {
        setIsSignUp(false);
      };
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="form">
                    <div className="btn">
                        <button className={isSignUp?"SignupBtn btnActive":"SignupBtn"} onClick={handleSignUpClick}>Signup</button>
                        <button className={!isSignUp?"btnActive LoginBtn":"LoginBtn"}onClick={handleLoginClick}>Login</button>
                    </div>
                    <Login isActive={!isSignUp}/>
                    <Signup  isActive={isSignUp}/>
                </div>
            </div>
        </>
    )
}

export default Auth