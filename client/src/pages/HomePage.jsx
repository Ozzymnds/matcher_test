import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <div>
            <h1>Bienvenido a la Página Principal</h1>
            <nav>
                <ul>
                    <li><Link to="/schools">Escuelas</Link></li>
                    <li><Link to="/students">Estudiantes</Link></li>
                    <li><Link to="/companies">Companies</Link></li>
                    <li><Link to="/teachers">Profesores</Link></li>
                    <li><Link to="/activities">Actividades</Link></li>
                    <li><Link to="/usertypes">Tipos de Usuarios</Link></li>
                    <li><Link to="/users">Usuarios</Link></li>
                </ul>
            </nav>
        </div>
    );
}