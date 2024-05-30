import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllCompanies } from "../../api/company.api";
import { getAllStudents } from "../../api/student.api";
import { Navigation } from "../../components/feedback/FeedbackNavigation";

export function FeedbackFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [companies, setCompanies] = useState([]);
    const [students, setStudents] = useState([]);

    const dropdownCompanies = async () => {
        try {
            const companies = await getAllCompanies();
            setCompanies(companies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const dropdownStudents = async () => {
        try {
            const students = await getAllStudents();
            setStudents(students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        dropdownCompanies();
        dropdownStudents();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/feedback/${params.id}/`, data, {
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
                navigate('/feedback');
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/feedback/', data, {
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
            navigate('/feedback');
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

    const loadFeedback = async () => {
        if (params.id) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/feedback/${params.id}/`, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res && res.data) {
                    const { data } = res;
                    setValue('id', data.id);
                    setValue('company', data.company_id);
                    setValue('student', data.student_id);
                    setValue('strengths', data.strengths);
                    setValue('weaknesses', data.weaknesses);
                } else {
                    console.log('Error fetching feedback');
                }
            } catch (e) {
                console.error('Error fetching feedback:', e.response?.data || e.message);
            }
        }
    };

    useEffect(() => {
        loadFeedback();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Editar Feedback' : 'Crear Feedback'}</h1>

                <label className="block text-gray-900">Pros</label>
                <textarea
                    type="text"
                    className="bg-blue-100 p-4 text-lg rounded-lg block w-full mb-3 text-gray-900"
                    {...register("strengths", { required: true })}
                />
                {errors.strengths && <span className="text-red-500">Obligatorio</span>}

                <label className="block text-gray-900">Contras</label>
                <textarea
                    type="text"
                    className="bg-blue-100 p-4 text-lg rounded-lg block w-full mb-3 text-gray-900"
                    {...register("weaknesses", { required: true })}
                />
                {errors.weaknesses && <span className="text-red-500">Obligatorio</span>}

                <label className="block text-gray-900">Student</label>
                <select className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("student", { required: true })}>
                    <option value="">Seleccione un estudiante</option>
                    {students.map(student => (
                        <option key={student.student_dni} value={student.student_dni}>{student.name}</option>
                    ))}
                </select>
                {errors.student && <span className="text-red-500">Obligatorio</span>}

                <label className="block text-gray-900">Company</label>
                <select className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("company", { required: true })}>
                    <option value="">Seleccione una empresa</option>
                    {companies.map(company => (
                        <option key={company.company_cif} value={company.company_cif}>{company.name}</option>
                    ))}
                </select>
                {errors.company && <span className="text-red-500">Obligatorio</span>}

                <button className="bg-blue-500 text-white px-3 py-3 rounded-lg mt-3 w-full" type="submit">Guardar</button>
            </form>

            {params.id &&
                <div className="w-full max-w-2xl mt-6">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('¿Estás seguro de que quieres eliminar este ítem?');
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/feedback/${params.id}/`);
                                toast.success('Deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/feedback');
                            }
                        }}
                    >Eliminar</button>
                </div>
            }
        </div>
    );
}
