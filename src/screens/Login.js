import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

        fetch('http://localhost:5050/api/inventory_system/auth/login', options)
            .then((response) => (response.json()))
            .then((jsonData) => {
                console.log(jsonData);
                localStorage.setItem('authToken', jsonData.token);
                history.push('/');
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
        <div>
            <h1>
                Login!
            </h1>
            <Link to="/">
                Home
            </Link>
            <div>
                <div>
                    <input onChange={(e)=>(setUsername(e.target.value))} />
                    <input onChange={(e)=>(setPassword(e.target.value))} />
                </div>
                <div>
                    <button onClick={loginHandler}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}