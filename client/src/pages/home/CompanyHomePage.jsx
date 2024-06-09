import React from 'react';
import { Link } from 'react-router-dom';

const CompanyHomePage = ({ user, onLogout }) => (
    <div>
        <h1>Bienvenido, {user.name}</h1>
        <button onClick={onLogout}>Logout</button>
        <Link to="/user-details">Ver Datos de Usuario</Link>
        <Link to="/feedback/company">Publicar Feedback sobre Estudiante</Link>
    </div>
);

export default CompanyHomePage;
