import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllTeachers } from "../../../api/teacher.api";
import { Navigation } from "../../../components/feedbacks/teachers/Navigation";

export function TFeedbackFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [teachers, setTeachers] = useState([]);

    const dropdownTeachers = async () => {
        try {
            const res = await getAllTeachers();
            setTeachers(res);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    useEffect(() => {
        dropdownTeachers();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/teacherfeedback/${params.id}/`, data, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Updated', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
                navigate('/teacherfeedback');
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/teacherfeedback/', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
            }
            navigate('/teacherfeedback');
        } catch (e) {
            console.error('Error saving:', e.response?.data || e.message);
            toast.error('Failed to save', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'blue',
                    color: 'black'
                }
            });
        }
    });

    const loadTeacherFeedback = async () => {
        if (params.id) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/teacherfeedback/${params.id}/`, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res && res.data) {
                    const { data } = res;
                    setValue('id', data.id);
                    setValue('title', data.title);
                    setValue('updated_on', data.updated_on);
                    setValue('content', data.content);
                    setValue('created_on', data.created_on);
                    setValue('author', data.author);
                } else {
                    console.log('Error fetching feedback');
                }
            } catch (e) {
                console.error('Error fetching feedback:', e.response?.data || e.message);
            }
        }
    };

    useEffect(() => {
        loadTeacherFeedback();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Editar Feedback' : 'Crear Feedback'}</h1>

                <label className="block text-gray-900">Titulo</label>
                <textarea
                    type="text"
                    className="bg-blue-100 p-4 text-lg rounded-lg block w-full mb-3 text-gray-900"
                    {...register("title", { required: true })}
                />
                {errors.title && <span className="text-red-500">Obligatorio</span>}

                <label className="block text-gray-900">Reseña</label>
                <textarea
                    type="text"
                    className="bg-blue-100 p-4 text-lg rounded-lg block w-full mb-3 text-gray-900"
                    {...register("content", { required: true })}
                />
                {errors.content && <span className="text-red-500">Obligatorio</span>}

                <label className="block text-gray-900">Profesor</label>
                <select className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("author", { required: true })}>
                    <option value="">Seleccione una empresa</option>
                    {teachers.map(teacher => (
                        <option key={teacher.teacher_dni} value={teacher.teacher_dni}>{teacher.name}</option>
                    ))}
                </select>
                {errors.author && <span className="text-red-500">Obligatorio</span>}

                <button className="bg-blue-500 text-white px-3 py-3 rounded-lg mt-3 w-full" type="submit">Guardar</button>
            </form>

            {params.id &&
                <div className="w-full max-w-2xl mt-6">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('¿Estás seguro de que quieres eliminar este ítem?');
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/teacherfeedback/${params.id}/`);
                                toast.success('Deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/teacherfeedback');
                            }
                        }}
                    >Eliminar</button>
                </div>
            }
        </div>
    );
}
