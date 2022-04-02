import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Styles from "../styles/screens/profile.module.css";

import { apiHost } from '../api';


export default function Profile({ history }) {
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }

        const fetchPrivateData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/my-data`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    console.log(jsonData.data);
                    setUserData(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('role');
                    history.push('/login');
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchPrivateData();

    }, [history]);

    return (
        <Layout>
            <div className={Styles.mainContainer}>
                <h1>
                    User Profile
                </h1>
                <div className={Styles.profile}>
                    {
                        userData && (
                            <>
                                <h1 className={Styles.username}>
                                    {userData.username}
                                </h1>
                                <h2 className={Styles.contact}>
                                    {userData.email}
                                </h2>
                                <p className={Styles.role}>
                                    {userData.role} role
                                </p>
                                <p className={Styles.store}>
                                    {userData.Store.name} (store), {userData.Store.location}
                                </p>
                            </>
                        )
                    }
                </div>
            </div>
        </Layout>
    );
}