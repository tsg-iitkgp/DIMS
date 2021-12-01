import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function Logout() {
    localStorage.removeItem('authToken');
    return (
        <Redirect to="/login" />
    )
}

export default Logout;
