import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Navigation } from "./Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function List() {
    const [studentfeedback, setStudentsfeedback] = useState([]);
    const [student, setStudents] = useState([]);

    const loadStudents = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/students/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStudents(res.data);
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

    const loadStudentsFeedback = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/studentfeedback/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStudentsfeedback(res.data);
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
        loadStudentsFeedback();
        loadStudents();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Feedback de estudiantes</h1>
            <div className="grid grid-cols-3 gap-3">
                {studentfeedback.map((studentfeedback) => {
                    return <Card key={studentfeedback.id} studentfeedback={studentfeedback} student={student} />
                })}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/studentfeedback-create">Nueva reseña</Link>
            </button>
        </div>

    )
}