import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigation } from "../../components/company/CompanyNavigation";
import axios from "axios";

export function CompanyFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [activities, setActivities] = useState([]);

    const dropdownActivities = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/activities', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setActivities(res.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }

    useEffect(() => {
        dropdownActivities();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let res;
            if (params.id) {
                res = await axios.put(`http://127.0.0.1:80/api/funciones/api/v1/companies/${params.id}/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Updated', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'green',
                        color: 'white'
                    }
                });
            } else {
                res = await axios.post(`http://127.0.0.1:80/api/funciones/api/v1/companies/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Created', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: 'blue',
                        color: 'white'
                    }
                });
            }
            navigate('/companies');
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
        if (params.company_cif) {
            async function loadCompany() {
                try {
                    const company = await axios.get(`http://127.0.0.1:80/api/funciones/api/v1/companies/${params.company_cif}/`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (company && company.data) {
                        const { company_cif, name, address, mail, website, work_area} = company.data;
                        setValue("name", name);
                        setValue("company_cif", company_cif);
                        setValue("address", address);
                        setValue("mail", mail);
                        setValue("website", website);
                        setValue("work_area", work_area);
                    } else {
                        console.log('No data found for the given company CIF');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            loadCompany();
        }
    }, [params.id]);

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center">
            <Navigation />
            <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">{params.id ? "Editar Empresa" : "Crear Empresa"}</h1>

                <label className="block text-gray-900">Nombre</label>
                <input type="text" className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("name", { required: true })} />
                {errors.name && <span className="text-red-500">El nombre es obligatorio</span>}

                <label className="block text-gray-900">Dirección</label>
                <input type="text" className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("address", { required: true })} />
                {errors.address && <span className="text-red-500">La dirección es obligatoria</span>}

                <label className="block text-gray-900">Correo</label>
                <input type="text" className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("mail", { required: true })} />
                {errors.mail && <span className="text-red-500">El correo es obligatorio</span>}

                <label className="block text-gray-900">Sitio web</label>
                <input type="text" className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("website", { required: true })} />
                {errors.website && <span className="text-red-500">El sitio web es obligatorio</span>}

                {/* 
                <input type="text" className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("work_area", { required: true })} /> */}


                <label className="block text-gray-900">Área de trabajo</label>
                <select className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("work_area", { required: true })}>
                    <option value="">Seleccione una actividad</option>
                    {activities.map((activity) => (
                        <option key={activity.activity_id} value={activity.activity_id}>{activity.name}</option>
                    ))}
                </select>
                {errors.work_area && <span className="text-red-500">El área de trabajo es obligatoria</span>}

                <button className="bg-blue-500 text-white px-3 py-3 rounded-lg mt-3 w-full" type="submit" onClick={onSubmit}>
                    {params.id ? "Editar Empresa" : "Crear Empresa"}
                </button>
            </form>

            {params.id &&
                <div className="w-full max-w-2xl mt-6">
                    <button className='bg-red-500 text-white p-3 rounded-lg block w-full mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure you want to delete this item?');
                            if (accepted) {
                                await axios.delete(`http://127.0.0.1:80/api/funciones/api/v1/companies/${params.id}/`, data, {
                                    withCredentials: true,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                toast.success('Company deleted', {
                                    duration: 3000,
                                    position: 'bottom-right',
                                    style: {
                                        background: 'red',
                                        color: 'black'
                                    }
                                });
                                navigate('/companies');
                            }
                        }}>
                        Delete
                    </button>
                </div>
            }
        </div>
    );
}
