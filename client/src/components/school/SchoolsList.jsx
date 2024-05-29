import { useEffect, useState } from "react";
import { SchoolCard } from "./SchoolCard";
import { Navigation } from "./SchoolNavigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function SchoolList() {
    const [schools, setSchools] = useState([]);

    const loadSchools = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/schools/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSchools(res.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Credenciales incorrectas.');
            } else if (error.response && error.response.status === 403) {
                console.error('Forbidden:', error.response);
            } else if (error.response && error.response.status === 400) {
                console.error('Bad request:', error.response);
                window.location.reload();
            } else {
                console.error('Error:', error.response);
            }
        }
    };

    useEffect(() => {
        loadSchools();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Lista de Escuelas</h1>
            <div className="grid grid-cols-3 gap-3">
                {schools.map((school) => {
                    return <SchoolCard key={school.school_id} school={school} />;
                })}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/schools-create">Crear Escuela</Link>
            </button>
        </div>
    );
};
