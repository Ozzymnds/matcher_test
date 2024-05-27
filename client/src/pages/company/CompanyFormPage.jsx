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
        <div className="max-w-xl mx-auto">
            <Navigation />
            <form>
                <h1>{params.id ? "Editar Empresa" : "Crear Empresa"}</h1>
                <label>Nombre</label>
                <input type="text" className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" {...register("name", { required: true })} />
                {errors.name && <span>El nombre es obligatorio</span>}

                <label>Dirección</label>
                <input type="text" className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" {...register("address", { required: true })} />
                {errors.address && <span>La dirección es obligatoria</span>}

                <label>Email</label>
                <input type="text" className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" {...register("mail", { required: true })} />
                {errors.mail && <span>El correo es obligatorio</span>}

                <label>Sitio web</label>
                <input type="text" className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" {...register("website", { required: true })} />
                {errors.website && <span>El sitio web es obligatorio</span>}

                <label>Área de trabajo</label>
                <input type="text" className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" {...register("work_area", { required: true })} />
                {errors.work_area && <span>El área de trabajo es obligatoria</span>}

                <button className="bg-green-500 px-3 py-3 rounded-lg mt3" type="submit" onClick={onSubmit}>
                    {params.id ? "Editar Empresa" : "Crear Empresa"}
                </button>
            </form>

            {params.id &&
                <div>
                    <button className='bg-red-500 p-3 rounded-lg block w-full mt-3'
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