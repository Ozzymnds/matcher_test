import React from "react";
import { Link } from "react-router-dom";

export function Navigation () {
    return (
        <div>
            <div>
                <Link to="/home">
                    <h2>Home</h2>
                </Link>
            </div>
            <div>
                <Link to="/preferences">
                    <h2>Preferencias</h2>
                </Link>
            </div>
        </div>
    );
}