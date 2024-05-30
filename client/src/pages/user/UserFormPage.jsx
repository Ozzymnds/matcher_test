import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllUserTypes } from "../../api/user_type.api";
import { createUser, deleteUser, updateUser, getUserById } from "../../api/user.api";
import { Navigation } from "../../components/user/UserNavigation";

export function UserFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [userTypes, setUserTypes] = useState([]);

    const dropdown = async () => {
        try {
            const types = await getAllUserTypes();
            setUserTypes(types);
        } catch (error) {
            console.error('Error fetching user types:', error);
        }
    };

    useEffect(() => {
        dropdown();
    }, []);

    const loadUser = async () => {
        if (params.id) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/users/${params.id}/`, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res) {

                    const { data } = res;
                    console.log("data: ", data);
                    setValue('user_name', data.user_name);
                    setValue('user_password', data.user_password);
                    setValue('id_type', data.id_type);
                } else {
                    console.log('No data found for the given user ID');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    };

    useEffect(() => {
        loadUser();
    }, [params.id, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        console.log('Submitting data:', data);
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/users/${params.id}/`, data, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res) {
                    toast.success('Teacher updated', {
                        duration: 3000,
                        position: 'bottom-right',
                        style: {
                            background: 'blue',
                            color: 'black'
                        }
                    });
                    navigate("/users");
                } else {
                    console.log('No data found for the given user ID');
                }
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/users/', data, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('User created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
            }
            navigate('/users');
        } catch (error) {
            console.error('Error saving user:', error.response?.data || error.message);
            toast.error('Failed to save user', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'blue',
                    color: 'black'
                }
            });
        }
    });

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Editar Usuario' : 'Crear Usuario'}</h1>

                <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("user_name", { required: true })} />
                {errors.user_name && <span>El nombre es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("user_password", { required: true })} />
                {errors.user_password && <span>El password es obligatorio</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Type of user</label>
                <select
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("id_type", { required: true })}>
                    <option value="">Choose</option>
                    {userTypes.map(userType => (
                        <option key={userType.id_type} value={userType.id_type}>{userType.type_name}</option>
                    ))}
                </select>
                {errors.id_type_id && <span>El ID de la escuela es obligatorio</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
            </form>

            {params.id && (
                <div>
                    <button
                        className='bg-red-500 p-3 rounded-lg block w-full mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this item?');
                            if (accepted) {
                                try {
                                    await deleteUser(params.id);
                                    navigate('/users');
                                    toast.success('Task deleted', {
                                        duration: 3000,
                                        position: 'bottom-right',
                                        style: {
                                            background: 'red',
                                            color: 'black'
                                        }
                                    });
                                } catch (error) {
                                    console.error('Error deleting user:', error);
                                    toast.error('Failed to delete user', {
                                        duration: 3000,
                                        position: 'bottom-right',
                                        style: {
                                            background: 'red',
                                            color: 'black'
                                        }
                                    });
                                }
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
