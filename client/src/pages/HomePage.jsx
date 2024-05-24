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
                    {/* Agrega más enlaces según tus necesidades */}
                </ul>
            </nav>
        </div>
    );
}