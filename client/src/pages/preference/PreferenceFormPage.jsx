import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigation } from "../../components/preference/PreferenceNavigation";

export function PreferenceFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [activities, setActivities] = useState([]);
    const [students, setStudents] = useState([]);

    const dropdownActivities = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/activities/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setActivities(res.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }

    const dropdownStudents = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/students/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStudents(res.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    useEffect(() => {
        dropdownActivities();
        dropdownStudents();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/preferences/${params.id}/`, data, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Preference updated', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
                navigate('/preferences');
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/preferences/', data, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Preference created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
            }
            navigate('/preferences')
        } catch (err) {
            console.error('Error saving preference:', err.response?.data || err.message);
            toast.error('Failed to save preference', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'black'
                }
            });
        }
    });

    const loadPreference = async () => {
        if (params.id) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/preferences/${params.id}/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res && res.data) {
                    const { data } = res;
                    setValue('activity', data.activity_id);
                    setValue('student', data.student_id);
                } else {
                    console.log('Error fetching preference');
                }
            } catch (e) {
                console.error('Error fetching preference:', e.response?.data || e.message);
            }
        }
    }

    useEffect(() => {
        loadPreference();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Editar Preferencia' : 'Crear Preferencia'}</h1>

                <label className="block text-gray-900">Estudiante</label>
                <select className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("student", { required: true })}>
                    <option value="">Seleccione un estudiante</option>
                    {students.map((student) => (
                        <option key={student.student_dni} value={student.student_dni}>{student.name}</option>
                    ))}
                </select>
                {errors.student && <span className="text-red-500">Obligatorio</span>}

                <label className="block text-gray-900">Actividad</label>
                <select className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("activity", { required: true })}>
                    <option value="">Seleccione una actividad</option>
                    {activities.map((activity) => (
                        <option key={activity.activity_id} value={activity.activity_id}>{activity.name}</option>
                    ))}
                </select>
                {errors.activity && <span className="text-red-500">Obligatorio</span>}

                <button className="bg-blue-500 text-white px-3 py-3 rounded-lg mt-3 w-full" type="submit">Guardar</button>
                <button className="bg-gray-500 text-white px-3 py-3 rounded-lg mt-3 w-full" type="button" onClick={() => navigate('/preferences')}>Cancelar</button>
            </form>

            {params.id &&
                <div className="w-full max-w-2xl mt-6">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('¿Estás seguro de que quieres eliminar esta preferencia?');
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/preferences/${params.id}/`);
                                toast.success('Preference deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/preferences');
                            }
                        }}
                    >Eliminar</button>
                </div>
            }
        </div>
    );
}
