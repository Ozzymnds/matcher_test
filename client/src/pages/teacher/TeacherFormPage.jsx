import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigation } from "../../components/teacher/TeacherNavigation";

export function TeacherFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [schools, setSchools] = useState([]);

    const dropdown = async () => {
        try {
            const dropdownSchools = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/schools/`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSchools(dropdownSchools.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    useEffect(() => {
        dropdown();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        console.log('Submitting data:', data);  // Log de datos enviados
        console.log(params)
        try {
            let res;
            if (params.dni) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/teachers/${params.dni}/`, data, {
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
                navigate('/teachers');
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/teachers/', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res)
                toast.success('Teacher created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
            }
            navigate('/teachers');
        } catch (error) {
            console.error('Error saving teacher:', error.response?.data || error.message);  // Log de errores detallado
            navigate('/teachers');
            toast.error('Failed to save teacher', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'black'
                }
            });
        }
    });

    const loadTeacher = async () => {
        if (params.dni) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/teachers/${params.dni}/`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res) {
                    const { data } = res;
                    setValue('teacher_dni', data.teacher_dni);
                    setValue('name', data.name);
                    setValue('last_name', data.last_name);
                    setValue('phone_number', data.phone_number);
                    setValue('school_mail', data.school_mail);
                    setValue('school_id', data.school_id);
                } else {
                    console.log('No data found for the given teacher DNI');
                }
            } catch (error) {
                console.error('Error fetching teacher data: ', error);
            }
        }
    }

    useEffect(() => {
        loadTeacher();
    }, [params.dni, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.dni ? 'Editar Profesor' : 'Crear Profesor'}</h1>

                {!params.dni && (
                    <>
                        <label className="block mb-2 text-sm font-medium text-gray-700">DNI</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("teacher_dni", { required: true })} />
                        {errors.teacher_dni && <span className="text-red-500">El DNI es obligatorio</span>}
                    </>
                )}

                <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("name", { required: true })} />
                {errors.name && <span className="text-red-500">El nombre es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Apellido</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("last_name")} />
                {errors.last_name && <span className="text-red-500">El apellido es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("phone_number", { required: true })} />
                {errors.phone_number && <span className="text-red-500">El número de teléfono es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("school_mail")} />
                {errors.school_mail && <span className="text-red-500">El correo es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">School ID</label>
                <select className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("school_id", { required: true })}>
                    <option value="">Seleccione una escuela</option>
                    {schools.map(school => (
                        <option key={school.school_id} value={school.school_id}>{school.name}</option>
                    ))}
                </select>
                {errors.school_id && <span className="text-red-500">El ID de la escuela es obligatorio</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
            </form>

            {params.dni &&
                <div className="w-full max-w-2xl mt-6 mb-3">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this field?')
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/teachers/${params.dni}/`);
                                toast.success('Teacher deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/teachers');
                            }
                        }}>Delete</button>
                </div>
            }
        </div>
    );
}