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
                withCredentials: false,
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
                withCredentials: false,
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
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Teacher updated', {
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
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res)
                toast.success('Created', {
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
            console.error('Error saving preference:', err.response?.data || err.message);  // Log de errores detallado
            navigate('/preferences');
            toast.error('Failed to save preference', {
                duration: 3000,
                position: 'bottom-right',
            });
        }
    });

    const loadPreference = async () => {
        if (params.id) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/preferences/${params.id}/`, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res && res.data) {
                    const { data } = res;
                    setValue('activity', data.activity_id); // Updated to match the expected field name
                    setValue('student', data.student_id); // Updated to match the expected field name
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
    }, []);

    return (
        <div className='max-w-xl mx-auto'>
            <Navigation />
            <form onSubmit={onSubmit}>
                <h1>{params.id ? 'Editar' : 'Crear'}</h1>
                <label>Estudiante</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("student", { required: true })}>
                    <option value="">Seleccione un estudiante</option>
                    {students.map((student) => (
                        <option key={student.student_dni} value={student.student_dni}>{student.name}</option>
                    ))}
                    {errors.student && <span>Obligatorio</span>}
                </select>

                <label>Actividad</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("activity", { required: true })}>
                    <option value="">Seleccione una actividad</option>
                    {activities.map((activity) => (
                        <option key={activity.activity_id} value={activity.activity_id}>{activity.name}</option>
                    ))}
                </select>
                {errors.activity && <span>Obligatorio</span>}


                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="button" onClick={() => navigate('/preferences')}>Cancel</button>
            </form>

            {params.id &&
                <div>
                    <button className='bg-red-500 p-3 rounded-lg block w-full mt-3'
                        onClick={async () => {
                            await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/preferences/${params.id}/`);
                            toast.success('Teacher deleted', {
                                duration: 3000,
                                position: 'bottom-right',
                                style: {
                                    background: 'red',
                                    color: 'black'
                                }
                            });
                            navigate('/preferences');
                        }}>Delete</button>
                </div>}
        </div>
    )
}