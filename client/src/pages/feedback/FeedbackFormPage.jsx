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
    }

    const dropdownStudents = async () => {
        try {
            const students = await getAllStudents();
            setStudents(students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

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
                console.log(res.data);
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
                    setValue('company', data.company_id); // Updated to match the expected field name
                    setValue('student', data.student_id); // Updated to match the expected field name
                    setValue('strengths', data.strengths);
                    setValue('weaknesses', data.weaknesses);
                } else {
                    console.log('Error fetching feedback');
                }
            } catch (e) {
                console.error('Error fetching feedback:', e.response?.data || e.message);
            }
        }
    }

    useEffect(() => {
        loadFeedback();
    }, [params.id, setValue]);

    return (
        <div className='max-w-xl mx-auto'>
            <Navigation />
            <form onSubmit={onSubmit}>
                <h1>{params.id ? 'Editar ' : 'Crear '}</h1>

                <label>Pros</label>
                <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("strengths", { required: true })} />
                {errors.name && <span>Obligatorio</span>}

                <label>Contras</label>
                <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("weaknesses")} />
                {errors.last_name && <span>Obligatorio</span>}

                <label>Company</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("company", { required: true })}>
                    <option value="">Seleccione una empresa</option>
                    {companies.map(company => (
                        <option key={company.company_cif} value={company.company_cif}>{company.name}</option>
                    ))}
                </select>
                {errors.company && <span>Obligatorio</span>}

                <label>Student</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("student", { required: true })}>
                    <option value="">Seleccione un estudiante</option>
                    {students.map(student => (
                        <option key={student.student_dni} value={student.student_dni}>{student.name}</option>
                    ))}
                </select>
                {errors.student && <span>Obligatorio</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
            </form>

            {params.id &&
                <div>
                    <button className='bg-red-500 p-3 rounded-lg block w-full mt-3'
                        onClick={async () => {
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
                        }}>Delete</button>
                </div>
            }
        </div>
    );
}
