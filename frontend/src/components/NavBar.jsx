import React from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/nav.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from './Profile';
const NavBar = () => {
    const { isAuthenticated } = useSelector(
        (state) => state.user
    );
    const [showMenuLinks, setShowMenuLinks] = useState(false);
    return (
        <>
            <nav className="main-nav">
                <div className="logo"><h2>CityScape</h2></div>
                <div className={
                    showMenuLinks ? "menu-link mobile-menu-link fade-in" : "menu-link"
                }>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/city">Cities</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            {/* make it login or profile */}
                            {
                                !isAuthenticated
                                    ?
                                    <NavLink to="/login">Login</NavLink>
                                    :
                                    <Profile isMobileView={showMenuLinks}/>
                            }
                        </li>
                    </ul>
                </div>
                <div className="hamburger-menu">
                    <button  onClick={() => setTimeout(() => {
                        setShowMenuLinks(!showMenuLinks)
                    }, 200)} >
                        <GiHamburgerMenu />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar;