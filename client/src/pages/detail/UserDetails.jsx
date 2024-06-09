import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navigation from "../../components/nav/Navigation"; // Asegúrate de tener una barra de navegación común para todos

function UserDetailsPage() {
    console.log('UserDetailsPage render');
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        async function loadUserDetails() {
            try {
                const res = await axios.get(`http://127.0.0.1:80/api/auth/whoami/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res && res.data) {
                    const user = res.data;
                    setUserType(user.type);

                    if (user.type === "student") {
                        const { student_dni, name, last_name, address, school_mail, teacher_id } = user;
                        setValue('student_dni', student_dni);
                        setValue('name', name);
                        setValue('last_name', last_name);
                        setValue('address', address);
                        setValue('school_mail', school_mail);
                        setValue('teacher_id', teacher_id);
                    } else if (user.type === "teacher") {
                        const { teacher_dni, name, last_name, phone_number, school_mail, school_id } = user;
                        setValue('teacher_dni', teacher_dni);
                        setValue('name', name);
                        setValue('last_name', last_name);
                        setValue('phone_number', phone_number);
                        setValue('school_mail', school_mail);
                        setValue('school_id', school_id);
                    } else if (user.type === "company") {
                        const { company_cif, name, address, mail, website, work_area } = user;
                        setValue('company_cif', company_cif);
                        setValue('name', name);
                        setValue('address', address);
                        setValue('mail', mail);
                        setValue('website', website);
                        setValue('work_area', work_area);
                    }
                } else {
                    console.log('No data found for the logged-in user');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }

        loadUserDetails();
    }, [setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let endpoint;
            if (userType === "student") {
                console.log("estudiante", data);
                endpoint = `http://127.0.0.1:80/api/funciones/api/v1/students/${data.student_dni}/`;
            } else if (userType === "teacher") {
                console.log("profe", data);
                endpoint = `http://127.0.0.1:80/api/funciones/api/v1/teachers/${data.teacher_dni}/`;
            } else if (userType === "company") {
                console.log("empresa", data);
                endpoint = `http://127.0.0.1:80/api/funciones/api/v1/companies/${data.company_cif}/`;
            }

            const res = await axios.put(endpoint, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast.success('User updated successfully', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'green',
                    color: 'white'
                }
            });

        } catch (error) {
            console.error('Error saving user:', error.response?.data || error.message);
            toast.error('Failed to save user', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        }
    });

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">Detalles del Usuario</h1>

                {userType === "student" && (
                    <>
                        <label className="block mb-2 text-sm font-medium text-gray-700">DNI</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("student_dni", { required: true })}
                            readOnly
                        />
                        {errors.student_dni && <span className="text-red-500">El DNI es obligatorio</span>}

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
                            {...register("last_name")}
                        />
                        {errors.last_name && <span className="text-red-500">El apellido es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("address", { required: true })}
                        />
                        {errors.address && <span className="text-red-500">La dirección es obligatoria</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("school_mail")}
                        />
                        {errors.school_mail && <span className="text-red-500">El correo es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Teacher ID</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("teacher_id")}
                            readOnly
                        />
                    </>
                )}

                {userType === "teacher" && (
                    <>
                        <label className="block mb-2 text-sm font-medium text-gray-700">DNI</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("teacher_dni", { required: true })}
                            readOnly
                        />
                        {errors.teacher_dni && <span className="text-red-500">El DNI es obligatorio</span>}

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
                            {...register("last_name")}
                        />
                        {errors.last_name && <span className="text-red-500">El apellido es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("phone_number", { required: true })}
                        />
                        {errors.phone_number && <span className="text-red-500">El número de teléfono es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("school_mail")}
                        />
                        {errors.school_mail && <span className="text-red-500">El correo es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">School ID</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("school_id")}
                            readOnly
                        />
                    </>
                )}

                {userType === "company" && (
                    <>
                        <label className="block mb-2 text-sm font-medium text-gray-700">CIF</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("company_cif", { required: true })}
                            readOnly
                        />
                        {errors.company_cif && <span className="text-red-500">El CIF es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span className="text-red-500">El nombre es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("address")}
                        />
                        {errors.address && <span className="text-red-500">La dirección es obligatoria</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("mail")}
                        />
                        {errors.mail && <span className="text-red-500">El correo es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Sitio Web</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("website")}
                        />
                        {errors.website && <span className="text-red-500">El sitio web es obligatorio</span>}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Área de Trabajo</label>
                        <input
                            type="text"
                            className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                            {...register("work_area", { required: true })}
                        />
                        {errors.work_area && <span className="text-red-500">El área de trabajo es obligatoria</span>}
                    </>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 hover:bg-blue-500"
                    onClick={async => {
                        navigate('/home');
                    }}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}

export default UserDetailsPage;
