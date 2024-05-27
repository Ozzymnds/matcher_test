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
            console.log("antes del if", params);
            if (params.id) {
                console.log("despues del if", params);
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${params.id}/`, {
                        withCredentials: false,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log("primero dentro del try", params);
                    if (response && response.data) {
                        const { data } = response;
                        console.log("la res", response)
                        console.log("dentro del if tras declarar la res", data)
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
        <div className='max-w-xl mx-auto'>
            <Navigation />
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Type name"
                    {...register("type_name", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb3' />
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
                <div>
                    <button className='bg-red-500 p-3 rounded-lg block w-full mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this item?');
                            if (accepted) {
                                await deleteUserType(params.id)
                                navigate('/usertypes');
                                toast.success('Deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                })
                            }
                        }}>Delete</button>
                </div>
            }
        </div>
    )
}