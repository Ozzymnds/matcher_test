import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteStudent } from "../../api/student.api";
import { getAllCompanies } from "../../api/company.api";
import { getAllTeachers } from "../../api/teacher.api";
import { Navigation } from "../../components/student/StudentNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export function StudentFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [companies, setCompanies] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const dropdownTeachers = async () => {
        try {
            const teachers = await getAllTeachers();
            setTeachers(teachers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        dropdownTeachers();
    }, []);

    const dropdownCompanies = async () => {
        try {
            const companies = await getAllCompanies();
            setCompanies(companies);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        dropdownCompanies();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        console.log('Submitting data:', data);
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/students/${params.id}/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res) {
                    toast.success('Student updated', {
                        duration: 3000,
                        position: 'bottom-right',
                        style: {
                            background: 'green',
                            color: 'white'
                        }
                    });
                    navigate('/students');
                }
            } else {
                res = await axios.post(`http://127.0.0.1:8000/funciones/api/v1/students/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res);
                toast.success('Student created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'white'
                    }
                });
            }
            navigate('/students');
        } catch (error) {
            console.error('Error saving student:', error.response?.data || error.message);
            toast.error('Failed to save student', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        }
    });

    const loadStudent = async () => {
        if (params.id) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/students/${params.id}/`, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res && res.data) {
                    const { student_dni, name, last_name, address, school_mail, teacher } = res.data;
                    setValue('student_dni', student_dni);
                    setValue('name', name);
                    setValue('last_name', last_name);
                    setValue('address', address);
                    setValue('school_mail', school_mail);
                    setValue('teacher', teacher);
                } else {
                    console.log('No data found for the given student ID');
                }
            } catch (error) {
                console.error('Error fetching student data: ', error);
            }
        }
    };

    useEffect(() => {
        loadStudent();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Editar Estudiante' : 'Crear Estudiante'}</h1>

                {!params.id && (
                    <>
                        <label className="block mb-2 text-sm font-medium text-gray-700">DNI</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("student_dni", { required: true })}
                        />
                        {errors.student_dni && <span className="text-red-500">El DNI es obligatorio</span>}
                    </>
                )}

                <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                    {...register("name", { required: true })}
                />
                {errors.name && <span className="text-red-500">El nombre es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Apellido</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                    {...register("last_name", { required: true })}
                />
                {errors.last_name && <span className="text-red-500">El apellido es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                    {...register("school_mail", { required: true })}
                />
                {errors.school_mail && <span className="text-red-500">El correo es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                    {...register("address", { required: true })}
                />
                {errors.address && <span className="text-red-500">La dirección es obligatoria</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Teacher ID</label>
                <select
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                    {...register("teacher_id", { required: true })}
                >
                    <option value="">Seleccione un profesor</option>
                    {teachers.map(teacher => (
                        <option key={teacher.teacher_dni} value={teacher.teacher_dni}>{teacher.name}</option>
                    ))}
                </select>
                {errors.teacher_id && <span className="text-red-500">El ID del profesor es obligatorio</span>}

                <button className="bg-indigo-500 text-white p-3 rounded-lg block w-full mt-3" type="submit">Save</button>
                <button className="bg-gray-500 text-white p-3 rounded-lg block w-full mt-3" type="button" onClick={() => navigate('/students')}>Cancel</button>
            </form>

            {params.id && (
                <div className="w-full max-w-2xl mt-6 mb-3">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this student?');
                            if (accepted) {
                                await deleteStudent(params.id);
                                toast.success('Student deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'white'
                                    }
                                });
                                navigate('/students');
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
