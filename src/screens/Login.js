import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from '../styles/screens/login.module.css';

import { apiHost } from '../api';


export default function Login({ history }) {
    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/');
        }
    }, [history]);

    const loginHandler = (e) => {
        e.preventDefault();
        setError('');

        const postData = {
            username,
            password
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        }

        fetch(`${apiHost}/api/inventory_system/auth/login`, options)
            .then((response) => (response.json()))
            .then((jsonData) => {
                // console.log(jsonData);
                if (jsonData.token && jsonData.role) {
                    localStorage.setItem('authToken', jsonData.token);
                    localStorage.setItem('role', jsonData.role);
                    history.push('/');
                } else {
                    setError(jsonData.error);
                }

            }).catch((error) => {
                console.log(error);
                /*
                setError(error.response.data.error);
                
                setTimeout(() => {
                    setError('');
                }, 5000);
                */
            });
    }
    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.card}>
                <div className={Styles.formContainer}>
                    <div className={Styles.errorContainer}>
                        {error}
                    </div>
                    <h1>
                        Login!
                    </h1>
                    <form className={Styles.form}>
                        <div>
                            <div className={Styles.inputContainer}>
                                <input type="text" onChange={(e) => (setUsername(e.target.value))} />
                            </div>
                            <div className={Styles.inputContainer}>
                                <input type="password" onChange={(e) => (setPassword(e.target.value))} />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className={Styles.loginBtn} onClick={loginHandler}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div></div>
            </div>
        </div>
    );
}