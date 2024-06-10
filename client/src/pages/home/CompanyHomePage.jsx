import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/HomePage.css';


const CompanyHomePage = ({ user, onLogout }) => (
    <div className="homepage-container">
        <h1>Bienvenido</h1>
        <button onClick={onLogout} className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3">Logout</button>
        <div className="homepage-nav">
            <button className="styled-button"><Link to="/user-details">Ver Datos de Usuario</Link></button>
        </div>
        <div className="homepage-nav">
            <button className="styled-button"><Link to="/feedback/company">Publicar Feedback sobre Estudiantes</Link></button>
        </div>
    </div>
);

export default CompanyHomePage;