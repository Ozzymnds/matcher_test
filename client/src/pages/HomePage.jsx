import '../style/HomePage.css';
import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <div className="homepage-container">
            <h1>Bienvenido a la Página Principal</h1>
            <nav className="homepage-nav">
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
                        <Link to="/usertypes" className="homepage-card">Tipos de Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/users" className="homepage-card">Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/feedback" className="homepage-card">Feedback</Link>
                    </li>
                    <li>
                        <Link to="/preferences" className="homepage-card">Preferencias</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
