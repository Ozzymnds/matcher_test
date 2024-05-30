import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createCompany, deleteCompany, updateCompany, getCompanyById } from "../../api/company.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigation } from "../../components/company/CompanyNavigation";

export function CompanyFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (params.id) {
                await updateCompany(params.id, data);
            } else {
                await createCompany(data);
            }
            navigate("/companies");
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (params.id) {
            async function loadCompany() {
                try {
                    const company = await getCompanyById(params.id);
                    setValue("name", company.name);
                    setValue("company_cif", company.company_cif);
                    setValue("address", company.address);
                    setValue("mail", company.mail);
                    setValue("website", company.website);
                    setValue("work_area", company.work_area);
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

                <label className="block text-gray-900">Área de trabajo</label>
                <input type="text" className="bg-blue-100 p-3 rounded-lg block w-full mb-3 text-gray-900" {...register("work_area", { required: true })} />
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
                                await deleteCompany(params.id);
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
