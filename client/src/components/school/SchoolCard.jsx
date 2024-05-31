import { useNavigate } from 'react-router-dom';
import '../../style/Card.css';

export function SchoolCard({ school }) {
    const navigate = useNavigate();

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/schools/${school.school_id}`);
            }}>
            <h2 className='card-title'>{school.name}</h2>
            <p>{school.address}</p>
        </div>
    );
};