import React from 'react';
import { Link } from 'react-router-dom';

const TeacherHomePage = ({ user, onLogout }) => (
    <div>
        <h1>Bienvenido, {user.name}</h1>
        <button onClick={onLogout}>Logout</button>
        <Link to="/user-details">Ver Datos de Usuario</Link>
        <Link to="/feedback/teacher">Publicar Feedback sobre Tutorías</Link>
        <Link to="/feedback/student">Ver Feedback de Estudiantes sobre Empresas</Link>
        <Link to="/feedback/company">Ver Feedback de Empresas sobre Estudiantes</Link>
    </div>
);


export default TeacherHomePage;