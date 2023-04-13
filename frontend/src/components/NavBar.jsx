import React from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/nav.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
const NavBar = () => {
    const [showMenuLinks, setShowMenuLinks] = useState(false);
    return (
        <>
            <nav className="main-nav">
                <div className="logo"><h2>MyCityInfo</h2></div>
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
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="hamburger-menu">
                    <a href="#" onClick={() => setTimeout(() => {
                        setShowMenuLinks(!showMenuLinks)
                    }, 200)} >
                    <GiHamburgerMenu />
                </a>
            </div>
        </nav>
        </>
    )
}

export default NavBar;