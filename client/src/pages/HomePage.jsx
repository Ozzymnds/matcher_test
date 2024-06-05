import '../style/HomePage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../components/auth/logs';

export function HomePage() {
    return (
        <div className="homepage-container">
            <h1>Bienvenido a la Página Principal</h1>
            <nav className="homepage-nav">
                <ul>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
                <ul className="homepage-grid">
                    <li>
                        <Link to="/schools" className="homepage-card">Escuelas</Link>
                    </li>
                    <li>
                        <Link to="/students" className="homepage-card">Estudiantes</Link>
                    </li>
                    <li>
                        <Link to="/companies" className="homepage-card">Compañías</Link>
                    </li>
                    <li>
                        <Link to="/teachers" className="homepage-card">Profesores</Link>
                    </li>
                    <li>
                        <Link to="/activities" className="homepage-card">Actividades</Link>
                    </li>
                    <li>
                        <Link to="/companyfeedback" className="homepage-card">Feedback de empresas sobre alumnos</Link>
                    </li>
                    <li>
                        <Link to="/studentfeedback" className="homepage-card">Feedback de alumnos sobre empresas</Link>
                    </li>
                    <li>
                        <Link to="/teacherfeedback" className="homepage-card">Feedback de profesores sobre tutorias/visitas</Link>
                    </li>
                    <li>
                        <Link to="/preferences" className="homepage-card">Preferencias</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
