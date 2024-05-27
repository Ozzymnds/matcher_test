import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createStudent, deleteStudent, updateStudent, getStudentById, getAllStudents } from "../../api/student.api";
import { getAllCompanies } from "../../api/company.api";
import { getAllTeachers } from "../../api/teacher.api";
import { getAllSchools } from "../../api/school.api";
import { Navigation } from "../../components/student/StudentNavigation"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";


export function StudentFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [companies, setCompanies] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [schools, setSchools] = useState([]);

    const dropdownSchools = async () => {
        try {
            const schools = await getAllSchools();
            setSchools(schools);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        dropdownSchools();
    }, []);

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
                            color: 'black'
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
                console.log(res)
                toast.success('Student created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
            }
            navigate('/students')
        } catch (error) {
            console.error('Error saving student:', error.response?.data || error.message);  // Log de errores detallado
            navigate('/students');
            toast.error('Failed to save student', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'black'
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
                    const { data } = res;
                    setValue('student_dni', data.student_dni);
                    setValue('name', data.name);
                    setValue('last_name', data.last_name);
                    setValue('address', data.address);
                    setValue('school_mail', data.school_mail);
                    setValue('teacher', data.teacher);
                    setValue('company', data.company);
                    setValue('school', data.school);
                } else {
                    console.log('No data found for the given student ID');
                }
            } catch (error) {
                console.error('Error fetching student data: ', error);
            }
        }
    }
    useEffect(() => {
        loadStudent();
    }, [params.id, setValue]);

    return (
        <div className='max-w-xl mx-auto'>
            <Navigation />
            <form onSubmit={onSubmit}>
                <h1>{params.id ? 'Editar Estudiante' : 'Crear Estudiante'}</h1>

                {!params.id && (
                    <>
                        <label>DNI</label>
                        <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("student_dni", { required: true })} />
                        {errors.student_dni && <span>El DNI es obligatorio</span>}
                    </>
                )}

                <label>Nombre</label>
                <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("name", { required: true })} />
                {errors.name && <span>El nombre es obligatorio</span>}

                <label>Apellido</label>
                <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("last_name", { required: true })} />
                {errors.last_name && <span>El apellido es obligatorio</span>}

                <label>Email</label>
                <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("school_mail", { required: true })} />
                {errors.school_mail && <span>El correo es obligatorio</span>}

                <label>Dirección</label>
                <input type="text" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("address", { required: true })} />
                {errors.address && <span>La dirección es obligatoria</span>}

                <label>Company ID</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("company_id", { required: true })}>
                    <option value="">Seleccione una empresa</option>
                    {Array.isArray(companies) && companies.map(company => (
                        <option key={company.company_cif} value={company.company_cif}>{company.name}</option>
                    ))}
                </select>
                {errors.company_cif && <span>El ID de la empresa es obligatorio</span>}

                <label>School ID</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("school_id", { required: true })}>
                    <option value="">Seleccione una escuela</option>
                    {Array.isArray(schools) && schools.map(school => (
                        <option key={school.school_id} value={school.school_id}>{school.name}</option>
                    ))}
                </select>
                {errors.school_id && <span>El ID de la escuela es obligatorio</span>}

                <label>Teacher ID</label>
                <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register("teacher_id", { required: true })}>
                    <option value="">Seleccione un profesor</option>
                    {Array.isArray(teachers) && teachers.map(teacher => (
                        <option key={teacher.teacher_dni} value={teacher.teacher_dni}>{teacher.name}</option>
                    ))}
                </select>
                {errors.teacher_id && <span>El ID del profesor es obligatorio</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
            </form>

            {params.id &&
                <div>
                    <button className='bg-red-500 p-3 rounded-lg block w-full mt-3'
                        onClick={async () => {
                            await deleteStudent(params.id);
                            toast.success('Student deleted', {
                                duration: 3000,
                                position: 'bottom-right',
                                style: {
                                    background: 'red',
                                    color: 'black'
                                }
                            });
                            navigate('/students');
                        }}>Delete</button>
                </div>
            }
        </div>
    );
}