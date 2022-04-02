import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { apiHost } from '../api';

export default function About({ history }) {
    const [privateData, setPrivateData] = useState('');

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
            fetch(`${apiHost}/api/inventory_system/private`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    setPrivateData(jsonData.message);
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('authToken');
                    history.push('/login');
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchPrivateData();

    }, [history]);

    return (
        <Layout>
            <div>
                <h1>
                    About
                </h1>
                <p>
                    {privateData}
                </p>
                <Link to='/'>
                    Home
                </Link>
            </div>
        </Layout>
    );
}