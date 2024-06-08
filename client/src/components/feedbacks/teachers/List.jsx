import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Navigation } from "./Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function List() {
    const [teacherfeedback, setTeachersfeedback] = useState([]);
    const [teacher, setTeachers] = useState([]);

    const loadTeachers = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/teachers/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTeachers(res.data);
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
    }

    const loadTeachersFeedback = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/teacherfeedback/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTeachersfeedback(res.data);
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
    }

    useEffect(() => {
        loadTeachers();
        loadTeachersFeedback();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Feedback de empresas</h1>
            <div className="grid grid-cols-3 gap-3">
                {teacherfeedback.map((teacherfeedback) => {
                    return <Card key={teacherfeedback.id} teacherfeedback={teacherfeedback} teacher={teacher} />
                })}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/teacherfeedback-create">Nueva reseña</Link>
            </button>
        </div>

    )
}