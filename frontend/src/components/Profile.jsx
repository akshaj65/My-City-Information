import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userAction';
import logo from '../Images/userlogo.png'
import '../styles/profile.css'; // Import the CSS file

const Profile = ({ isMobileView }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = () => {
        dispatch(logout());
        console.log('Sign out clicked');
    };
    return (

        <Fragment>
            {isMobileView ?
                <p className={`profile-link ${isOpen ? 'active' : ''}`} style={{'margin':"7px 0px"}} onClick={handleProfileClick}>Account</p> :
                <img
                    src={logo}
                    alt="User Logo"
                    onClick={handleProfileClick}
                    style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        filter: 'brightness(0%) contrast(0%) hue-rotate(220.2deg) saturate(995%)'
                    }}
                />
            }

            {(isOpen)&& (
                <div className={`profile-container profile-fade-in ${isOpen ? '' : 'visible'}`}>
                    <p className="profile-name">
                        <a href="/account">Profile</a>
                    </p>
                    <button className='profile-button' onClick={handleSignOut} >
                        Sign out
                    </button>
                </div>
            )}
        </Fragment>
    );
};

export default Profile;
