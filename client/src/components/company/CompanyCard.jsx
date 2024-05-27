import { useNavigate } from 'react-router-dom';

export function CompanyCard({ company }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/companies/${company.company_cif}`);
            }}>
            <h2>{company.name}</h2>
            <p>{company.company_cif}</p>
            <p>{company.address}</p>
            <p>{company.mail}</p>
            <p>{company.website}</p>
            <p>{company.work_area}</p>
        </div>
    )
}