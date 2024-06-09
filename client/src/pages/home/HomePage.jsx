import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import StudentHomePage from './StudentHomePage';
import TeacherHomePage from './TeacherHomePage';
import CompanyHomePage from './CompanyHomePage';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/whoami/');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout/');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (!user) return <div>Loading...</div>;

    switch (user.tipo_usuario) {
        case 'Estudiante':
            return <StudentHomePage user={user} onLogout={handleLogout} />;
        case 'Docente':
            return <TeacherHomePage user={user} onLogout={handleLogout} />;
        case 'Empresa':
            return <CompanyHomePage user={user} onLogout={handleLogout} />;
        default:
            return <div>Tipo de usuario desconocido</div>;
    }
};

export default HomePage;
