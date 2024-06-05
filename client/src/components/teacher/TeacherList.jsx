import { useEffect, useState } from "react";
import { getAllTeachers } from "../../api/teacher.api";
import { TeacherCard } from "./TeacherCard";
import { Navigation } from "./TeacherNavigation";
import { Link } from "react-router-dom";
import axios from "axios";

export function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [schools, setSchools] = useState([]);

    async function loadTeachers() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/teachers/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setTeachers(res.data);
            } else {
                console.log('Error fetching teachers');
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

    async function loadSchools() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/schools/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setSchools(res.data);
            } else {
                console.log('Error fetching teachers');
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

    useEffect(() => {
        loadTeachers();
        loadSchools();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='grid grid-cols-3 gap-4'>
                {teachers.map((teacher) => (
                    <TeacherCard key={teacher.teacher_dni} teacher={teacher} school={schools} />
                ))}
            </div>
            <Link to="/teachers-create">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Agregar profesor
                </button>
            </Link>
        </div>
    );
}