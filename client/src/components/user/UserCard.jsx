import { useNavigate } from "react-router-dom";
import '../../style/Card.css';

export function UserCard({ user, type }) {
    const navigate = useNavigate();

    const type_name = type.find(type => type.id_type === user.id_type)?.type_name;

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/users/${user.id_user}`);
            }}>
            <h2 className='card-title'>{user.user_name}</h2>
            <p>{type_name}</p>
        </div>
    )
}