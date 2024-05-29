import { useEffect, useState } from "react";
import { PreferenceCard } from "./PreferenceCard";
import { Navigation } from "./PreferenceNavigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function PreferenceList() {
    const [preferences, setPreferences] = useState([]);
    const [activities, setActivities] = useState([]); // Añade un estado para almacenar las actividades
    const [students, setStudents] = useState([]);

    async function loadPreferences() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/preferences/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setPreferences(res.data);
            } else {
                console.log('Error fetching preferences');
            }
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

    async function loadStudents() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/students/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setStudents(res.data);
            } else {
                console.log('Error fetching students');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    async function loadActivities() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/activities/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setActivities(res.data);
            } else {
                console.log('Error fetching activities');
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }

    useEffect(() => {
        loadPreferences();
        loadActivities(); 
        loadStudents();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='grid grid-cols-3 gap-4'>
                {preferences.map((preference) => (
                    <PreferenceCard key={preference.id} preference={preference} activities={activities} students={students} />
                ))}
            </div>
            <div>
                <Link to="/preferences-create">
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Crear preferencia</button>
                </Link>
            </div>
        </div>
    )
}

