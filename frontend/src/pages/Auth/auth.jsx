import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../components/NavBar'
import Login from './Login'
import Signup from './Signup'
import Loader from '../../components/Loader'
// import Swal from 'sweetalert2'
import { clearErrors } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'
const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const [isSignUp, setIsSignUp] = useState(false);
    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleLoginClick = () => {
        setIsSignUp(false);
    };
    const handleButtonClick = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
      };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/city');
        }
        if (error) {

            dispatch(clearErrors());
        }
    }, [dispatch, error, isAuthenticated, navigate])

    useEffect(() => {
        const newTitle = isSignUp ? 'CityScape | Join the Community' : 'CityScape | Login';
        document.title = newTitle;
        console.log(newTitle);
      }, [isSignUp]);
    

    return (
        <Fragment>
             <MetaData title={document.title} />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <NavBar />
                    <div className="container">
                        <div className="form">
                            <div className="btn">
                                <button className={isSignUp ? "SignupBtn btnActive" : "SignupBtn"} onClick={handleSignUpClick}>Signup</button>
                                <button className={!isSignUp ? "btnActive LoginBtn" : "LoginBtn"} onClick={handleLoginClick}>Login</button>
                            </div>
                            <Login isActive={!isSignUp} isLogin={isAuthenticated} />
                            <Signup isActive={isSignUp} isRegistered={isAuthenticated} />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Auth