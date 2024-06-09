import React from 'react';
import { Link } from 'react-router-dom';

const StudentHomePage = ({ user, onLogout }) => (
    <div>
        <h1>Bienvenido, {user.name}</h1>
        <button onClick={onLogout}>Logout</button>
        <Link to="/user-details">Ver Datos de Usuario</Link>
        <Link to="/preferences">Registrar Preferencias</Link>
        <Link to="/feedback/student">Publicar Feedback sobre Empresa</Link>
    </div>
);

export default StudentHomePage;
