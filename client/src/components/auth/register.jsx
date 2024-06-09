import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        tipo_usuario: 'Estudiante',
        student_dni: '',
        name: '',
        last_name: '',
        address: '',
        school_mail: '',
        teacher_dni: '',
        company_cif: '',
        mail: '',
        website: '',
        activity_id: '',
        phone_number: '',
        school_id: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [schools, setSchools] = useState([]);

    const fetchDropdownData = async () => {
        try {
            const [schoolsRes, teachersRes, activitiesRes] = await Promise.all([
                axios.get('http://127.0.0.1:80/api/funciones/api/v1/schools/'),
                axios.get('http://127.0.0.1:80/api/funciones/api/v1/teachers/'),
                axios.get('http://127.0.0.1:80/api/funciones/api/v1/activities/')
            ]);

            setSchools(schoolsRes.data);
            setTeachers(teachersRes.data);
            setActivities(activitiesRes.data);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://127.0.0.1:80/api/auth/create-user/', formData);
            alert('Usuario creado satisfactoriamente.');
            navigate('/home');
        } catch (err) {
            setError(err.response.data.detail);
        }
    };

    const renderAdditionalFields = () => {
        switch (formData.tipo_usuario) {
            case 'Estudiante':
                return (
                    <>
                        <div>
                            <label>DNI:</label>
                            <input type="text" name="student_dni" value={formData.student_dni} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={formData.name} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Apellido:</label>
                            <input type="text" name="last_name" value={formData.last_name} onChange={onChange} />
                        </div>
                        <div>
                            <label>Dirección:</label>
                            <input type="text" name="address" value={formData.address} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Email Escolar:</label>
                            <input type="email" name="school_mail" value={formData.school_mail} onChange={onChange} />
                        </div>
                        <div>
                            <label>Docente:</label>
                            <select name="teacher_dni" value={formData.teacher_dni} onChange={onChange} required>
                                <option value="">Seleccione un profesor</option>
                                {teachers.map(teacher => (
                                    <option key={teacher.teacher_dni} value={teacher.teacher_dni}>{teacher.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            case 'Empresa':
                return (
                    <>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={formData.name} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Dirección:</label>
                            <input type="text" name="address" value={formData.address} onChange={onChange} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="mail" value={formData.mail} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Sitio Web:</label>
                            <input type="url" name="website" value={formData.website} onChange={onChange} />
                        </div>
                        <div>
                            <label>Campo de estudio:</label>
                            <select name="activity_id" value={formData.activity_id} onChange={onChange} required>
                                <option value="">Seleccione una actividad</option>
                                {activities.map((activity) => (
                                    <option key={activity.activity_id} value={activity.activity_id}>{activity.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            case 'Docente':
                return (
                    <>
                        <div>
                            <label>DNI:</label>
                            <input type="text" name="teacher_dni" value={formData.teacher_dni} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={formData.name} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Apellido:</label>
                            <input type="text" name="last_name" value={formData.last_name} onChange={onChange} />
                        </div>
                        <div>
                            <label>Teléfono:</label>
                            <input type="text" name="phone_number" value={formData.phone_number} onChange={onChange} required />
                        </div>
                        <div>
                            <label>Email Escolar:</label>
                            <input type="email" name="school_mail" value={formData.school_mail} onChange={onChange} />
                        </div>
                        <div>
                            <label>Escuela:</label>
                            <select name="school_id" value={formData.school_id} onChange={onChange} required>
                                <option value="">Seleccione una escuela</option>
                                {schools.map(school => (
                                    <option key={school.school_id} value={school.school_id}>{school.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Usuario:</label>
                    <select name="tipo_usuario" value={formData.tipo_usuario} onChange={onChange} required>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Empresa">Empresa</option>
                        <option value="Docente">Docente</option>
                    </select>
                </div>
                {renderAdditionalFields()}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;