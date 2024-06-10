import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navigation from "../../components/nav/Navigation";

function UserDetailsPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        async function whoAmI() {
            try {
                const res = await axios.get(`http://127.0.0.1:80/api/auth/whoami/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res && res.data) {
                    const user = res.data;
                    setUserType(user.tipo_usuario.toLowerCase());
                    setUserId(user.id);
                } else {
                    console.log('No data found for the logged-in user');
                }
            } catch (error) {
                console.error('Error fetching user data en whoAmI: ', error);
            }
        }

        whoAmI();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (userType && userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:80/api/auth/${userType}/${userId}/`);
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    toast.error('Failed to fetch user details.');
                }
            }
        };

        fetchUserDetails();
    }, [userType, userId]);

    useEffect(() => {
        if (userDetails) {
            for (const [key, value] of Object.entries(userDetails)) {
                setValue(key, value);
            }
        }
    }, [userDetails, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let endpoint;
            if (userType === "student") {
                endpoint = `http://127.0.0.1:80/api/funciones/api/v1/students/${data.student_dni}/`;
            } else if (userType === "teacher") {
                endpoint = `http://127.0.0.1:80/api/funciones/api/v1/teachers/${data.teacher_dni}/`;
            } else if (userType === "company") {
                endpoint = `http://127.0.0.1:80/api/funciones/api/v1/companies/${data.company_cif}/`;
            }

            await axios.put(endpoint, data, {
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
            console.error('Error saving user:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
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

    const renderFormFields = () => {
        if (!userDetails) return null;

        if (userType === "student") {
            return (
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
            );
        }

        if (userType === "teacher") {
            return (
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
                    {errors.phone_number && <span className="text-red-500">El teléfono es obligatorio</span>}

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
            );
        }

        if (userType === "company") {
            return (
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
                        {...register("address", { required: true })}
                    />
                    {errors.address && <span className="text-red-500">La dirección es obligatoria</span>}

                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                        {...register("mail")}
                    />
                    {errors.mail && <span className="text-red-500">El correo es obligatorio</span>}

                    <label className="block mb-2 text-sm font-medium text-gray-700">Website</label>
                    <input
                        type="text"
                        className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                        {...register("website")}
                    />
                    {errors.website && <span className="text-red-500">El sitio web es obligatorio</span>}

                    <label className="block mb-2 text-sm font-medium text-gray-700">Work Area</label>
                    <input
                        type="text"
                        className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                        {...register("work_area")}
                        readOnly
                    />
                </>
            );
        }

        return null;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Navigation />
            <h1 className="text-2xl font-bold mb-6">Detalles del Usuario</h1>
            <form onSubmit={onSubmit}>
                {renderFormFields()}
                <div className="mt-6">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserDetailsPage;
