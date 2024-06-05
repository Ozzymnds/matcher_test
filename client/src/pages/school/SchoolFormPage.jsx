import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../../components/school/SchoolNavigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export function SchoolFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/schools/${params.id}/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Student updated', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'green',
                        color: 'white'
                    }
                });
            } else {
                res = await axios.post(`http://127.0.0.1:8000/funciones/api/v1/schools/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Student created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'white'
                    }
                });
            }
            navigate('/schools');
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        }
    });


    useEffect(() => {
        async function loadSchool() {
            if (params.id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/schools/${params.id}/`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response && response.data) {
                        const { name, address } = response.data;
                        setValue('name', name);
                        setValue('address', address);
                    } else {
                        console.log('No data found for the given school ID');
                    }
                } catch (error) {
                    console.error('Error fetching school data: ', error);
                }
            }
        }
        loadSchool();
    }, [params.id, setValue]);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? 'Edit School' : 'Create School'}</h1>

                <label className="block mb-2 text-sm font-medium text-gray-700">School Name</label>
                <input
                    type="text"
                    placeholder="School name"
                    {...register("name", { required: true })}
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                />
                {errors.name && <span className="text-red-500">This field is required</span>}

                <label className="block mb-2 text-sm font-medium text-gray-700">School Address</label>
                <input
                    type="text"
                    placeholder="School address"
                    {...register("address", { required: true })}
                    className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800"
                />
                {errors.address && <span className="text-red-500">This field is required</span>}

                <button className="bg-blue-500 text-white p-3 rounded-lg block w-full mt-3" type="submit">Save</button>
                <button className="bg-gray-500 text-white p-3 rounded-lg block w-full mt-3" type="button" onClick={() => navigate('/schools')}>Cancel</button>
            </form>

            {params.id && (
                <div className="mt-6">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg block w-full"
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this school?');
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/activities/${params.id}/`, data, {
                                    withCredentials: true,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                toast.success('School deleted successfully', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'white'
                                    }
                                });
                                navigate('/schools');
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
