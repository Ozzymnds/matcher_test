import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSchool, deleteSchool, updateSchool, getSchoolById } from "../../api/school.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function SchoolFormPage() {
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateSchool(params.id, data)
            toast.success('Task updated', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'blue',
                    color: 'black'
                }
            })
        } else {
            console.log('creating')
            await createSchool(data);
            toast.success('Task created', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: 'green',
                    color: 'black'
                }
            })
        }
        navigate('/schools');
    });

    useEffect(() => {
        async function loadSchool() {
            if (params.id) {
                try {
                    const response = await getSchoolById(params.id);
                    if (response && response.data) {
                        const { data } = response;
                        setValue('name', data.name);
                        setValue('address', data.address);
                    } else {
                        console.log('No data found for the given school ID');
                    }
                } catch (error) {
                    console.error('Error fetching school data: ', error);
                }
            }
        }
        loadSchool();
    }, [params.id, setValue]); // Asegúrate de incluir las dependencias necesarias

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="School name"
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
                <input type="text"
                    placeholder="School address"
                    {...register("address", { required: true })}
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
                                await deleteSchool(params.id)
                                navigate('/schools');
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