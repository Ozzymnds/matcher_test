import { useNavigate } from 'react-router-dom';
import '../../style/Card.css';

export function CompanyCard({ company, activities }) {
    const navigate = useNavigate();

    const activityName = activities.find(activity => activity.activity_id === company.work_area)?.name;
    
    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/companies/${company.company_cif}`);
            }}>
            <h2 className='card-title' >{company.name}</h2>
            <p>{company.address}</p>
            <p>{company.mail}</p>
            <p>{company.website}</p>
            <p>{activityName}</p>
        </div>
    )
}