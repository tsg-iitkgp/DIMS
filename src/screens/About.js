import React from "react";
import { Link } from "react-router-dom";

export default function About({ history }) {
    
    return (
        <div>
            <h1>
                About
            </h1>
            <Link to='/'>
                Home
            </Link>
        </div>
    );
}