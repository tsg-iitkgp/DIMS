import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Styles from '../styles/components/layout.module.css';

export default function Layout({ children }) {

    return (
        <div className={Styles.topLevelContainer}>
            <nav className={Styles.topNavContainer}>
                <div className={Styles.topNav}>
                    <div className={Styles.navHeadingContainer}>
                        <h1>
                            Inventory System
                        </h1>
                    </div>
                    <div className={Styles.navItemsContainer}>
                        <div className={Styles.navItem}>
                            <span className={Styles.profileIconContainer}>
                                <FaUser />
                            </span>
                            <div className={Styles.navDropdownContent}>
                                <Link className={Styles.navDropdownItem} to="/profile">
                                    Profile
                                </Link>
                                <Link className={Styles.navDropdownItem} to="/logout">
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={Styles.bgContainer}>
                <div className={Styles.sideNav}>
                    <Link to="/" className={Styles.sideItem}>
                        Dashboard
                    </Link>
                    <Link to="/requests" className={Styles.sideItem}>
                        Requests
                    </Link>
                    <Link to="/transactions" className={Styles.sideItem}>
                        Transactions
                    </Link>
                    {
                        localStorage.getItem('role') === 'admin' ? (
                            <Link to="/master-data" className={Styles.sideItem}>
                                Master
                            </Link>
                        ) : (
                            <></>
                        )
                    }
                    {/* <Link to="/private" className={Styles.sideItem}>
                        Private
                    </Link>
                    <Link to="/login" className={Styles.sideItem}>
                        Login
                    </Link>
                    <Link to="/about" className={Styles.sideItem}>
                        About
                    </Link> */}
                </div>
                <div className={Styles.mainContainer}>
                    {children}
                </div>
            </div>
        </div>

    );
}