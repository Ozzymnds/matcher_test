import { useEffect, useState } from "react";
import { getAllStudents } from "../../api/student.api";
import { StudentCard } from "./StudentCard";
import { Navigation } from "./StudentNavigation";
import { Link } from "react-router-dom";
import axios from "axios";

export function StudentList() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [companies, setCompanies] = useState([]);

    const loadStudents = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/students/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                // console.log(res.data); // Verifica los datos recibidos
                setStudents(res.data);
            } else {
                console.log('Error fetching students');
            }
        } catch (error) {
            console.log('Error fetching students: ', error);
        }
    };

    const loadTeachers = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/teachers/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                // console.log(res.data); // Verifica los datos recibidos
                setTeachers(res.data);
            } else {
                console.log('Error fetching students');
            }
        } catch (error) {
            console.log('Error fetching students: ', error);
        }
    };

    const loadCompanies = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/companies/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                // console.log(res.data); // Verifica los datos recibidos
                setCompanies(res.data);
            } else {
                console.log('Error fetching students');
            }
        } catch (error) {
            console.log('Error fetching students: ', error);
        }
    };
    useEffect(() => {
        loadStudents();
        loadTeachers();
        loadCompanies();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Lista de estudiantes</h1>
            <div className='grid grid-cols-3 gap-4'>
                {students.map(student => (
                    <StudentCard key={student.student_dni} student={student} teacher={teachers} company={companies} />
                ))}
            </div>
            <Link to="/students-create">
                <button>Crear Estudiante</button>
            </Link>
        </div>
    )
}