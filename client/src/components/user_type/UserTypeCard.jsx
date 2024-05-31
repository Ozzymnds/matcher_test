import { useNavigate } from "react-router-dom";
import '../../style/Card.css';

export function UserTypeCard({ usertype }) {
    const navigate = useNavigate();

    return (
        <div className='card-container'
            onClick={() => navigate(`/usertypes/${usertype.id_type}`)}>
            <h2 className='card-title'>{usertype.type_name}</h2>
        </div>
    );
}