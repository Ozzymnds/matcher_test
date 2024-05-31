import { useNavigate } from 'react-router-dom';
import '../../style/Card.css';

export function CompanyCard({ company }) {
    const navigate = useNavigate();

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/companies/${company.company_cif}`);
            }}>
            <h2 className='card-title' >{company.name}</h2>
            <p>{company.address}</p>
            <p>{company.mail}</p>
            <p>{company.website}</p>
            <p>{company.work_area}</p>
        </div>
    )
}