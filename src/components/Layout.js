import React from "react";
import { Link, NavLink } from "react-router-dom";
import Styles from '../styles/components/layout.module.css';

export default function Layout({ children }) {
    return (
        <div>
            <nav className={Styles.topNavContainer}>
                <div className={Styles.topNav}>
                    <div className={Styles.navHeadingContainer}>
                        <h1>
                            Inventory System
                        </h1>
                    </div>
                    <div className={Styles.navItemsContainer}>
                        <NavLink to="/" className={Styles.navItem}>
                            Home
                        </NavLink>
                    </div>
                </div>
            </nav>
            <div className={Styles.bgContainer}>
                <div className={Styles.sideNav}>
                    <Link to="/" className={Styles.sideItem}>
                        Home
                    </Link>
                    <Link to="/private" className={Styles.sideItem}>
                        Private
                    </Link>
                    <Link to="/login" className={Styles.sideItem}>
                        Login
                    </Link>
                    <Link to="/about" className={Styles.sideItem}>
                        About
                    </Link>
                </div>
                <div className={Styles.mainContainer}>
                    {children}
                </div>
            </div>
        </div>

    );
}