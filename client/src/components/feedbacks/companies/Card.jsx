import { useNavigate } from "react-router-dom";
import '../../../style/Card.css';

export function Card({ companyfeedback, company }) {
    const navigate = useNavigate();

    const companyName = company.find(company => company.company_cif === companyfeedback.author)?.name

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/companyfeedback/${companyfeedback.id}`);
            }}>
            <h2 className='card-title' >{companyfeedback.title}</h2>
            <p>{companyName}</p>
            <p>{companyfeedback.created_on}</p>
            <p>{companyfeedback.created_on}</p>
        </div>
    )
}