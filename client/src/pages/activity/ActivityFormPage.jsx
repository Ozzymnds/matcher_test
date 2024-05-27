import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createActivity, deleteActivity, updateActivity } from "../../api/activities.api";
import { Navigation } from "../../components/activity/ActivityNavigation";

export function ActivityFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        console.log('Submitting data:', data);  // Log de datos enviados
        console.log(params)
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/activities/${params.id}/`, data, {
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
                navigate('/activities');
            } else {
                res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/activities/', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res)
                toast.success('activities created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'black'
                    }
                });
            }
            navigate('/activities');
        } catch (error) {
            console.error('Error saving activities:', error.response?.data || error.message);  // Log de errores detallado
            navigate('/activities');
            toast.error('Failed to save activities', {
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
        async function loadActivitie() {
            if (params.id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/activities/${params.id}/`, {
                        withCredentials: false,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response && response.data) {
                        const { data } = response;
                        setValue('name', data.name);
                    } else {
                        console.log('No data found')
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        loadActivitie();
    }, [params.id, setValue]);

    return (
        <div className='max-w-xl mx-auto'>
            <Navigation />
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Activity name"
                    {...register("name", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb3' />
                {errors.name && toast.error('this field is required', {
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
                                await deleteActivity(params.id)
                                navigate('/activities');
                                toast.success('Task deleted', {
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