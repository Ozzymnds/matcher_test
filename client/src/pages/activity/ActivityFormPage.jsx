import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { deleteActivity } from "../../api/activities.api";
import { Navigation } from "../../components/activity/ActivityNavigation";

export function ActivityFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        console.log('Submitting data:', data);
        console.log(params);
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/activities/${params.id}/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                toast.success('Activity updated', {
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
                console.log(res);
                toast.success('Activity created', {
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
            console.error('Error saving activities:', error.response?.data || error.message);
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
        async function loadActivity() {
            if (params.id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/activities/${params.id}/`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response && response.data) {
                        const { data } = response;
                        setValue('name', data.name);
                    } else {
                        console.log('No data found');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        loadActivity();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? "Editar Actividad" : "Crear Actividad"}</h1>

                <label className="block text-gray-900">Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre de la actividad"
                    {...register("name", { required: true })}
                    className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900"
                />
                {errors.name && <span className="text-red-500">Este campo es obligatorio</span>}

                <button className="bg-blue-500 text-white px-3 py-3 rounded-lg mt-3 w-full" type="submit">Guardar</button>
            </form>

            {params.id &&
                <div className="w-full max-w-2xl mt-6">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('¿Estás seguro de que quieres eliminar este ítem?');
                            if (accepted) {
                                await deleteActivity(params.id);
                                toast.success('Actividad eliminada', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/activities');
                            }
                        }}
                    >Eliminar</button>
                </div>
            }
        </div>
    );
}
