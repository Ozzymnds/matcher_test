import React from "react";
import { Link } from "react-router-dom";
import "../../style/Navigation.css";
export function Navigation () {
    return (
        <div className="navigation-container">
            <div className="navigation-item">
                <Link to="/home" className="navigation-link">
                    <h2>Home</h2>
                </Link>
            </div>
            <div className="navigation-item">
                <Link to="/preferences" className="navigation-link">
                    <h2>Preferencias</h2>
                </Link>
            </div>
        </div>
    );
}