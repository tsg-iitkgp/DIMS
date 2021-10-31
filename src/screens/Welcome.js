import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <h1>
                Welcome!
            </h1>
            <Link to="/private">
                Go to private route - about
            </Link>
            <Link to="/login">
                Login
            </Link>
            <Link to="/about">
                About
            </Link>
        </div>
    );
}