import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createUserType, deleteUserType, updateUserType } from "../../api/user_type.api"
import { Navigation } from "../../components/user_type/UserTypeNavigation";

export function UserTypeFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        console.log('Submitting data:', data);  // Log de datos enviados
        console.log(params)
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${params.id}/`, data, {
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
                navigate('/usertypes');
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/usertypes/', data, {
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
            navigate('/usertypes');
        } catch (error) {
            console.error('Error saving:', error.response?.data || error.message);  // Log de errores detallado
            navigate('/activities');
            toast.error('Failed to save', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'black'
                }
            });
        }
    });

    useEffect(() => {
        async function loadUserType() {
            if (params.id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${params.id}/`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response && response.data) {
                        const { data } = response;
                        setValue('type_name', data.type_name);
                    } else {
                        console.log('No data found')
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        loadUserType();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Editar' : 'Crear'}</h1>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                    {...register("type_name", { required: true })} />
                {errors.type_name && toast.error('this field is required', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'red',
                        color: 'black'
                    }
                })}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
            </form>

            {params.id &&
                <div className="w-full max-w-2xl mt-6 mb-3">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this field?')
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${params.id}/`);
                                toast.success('Deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/usertypes');
                            }
                        }}>Delete</button>
                </div>
            }
        </div>
    )
}