import { useNavigate } from "react-router-dom";

export function UserTypeCard({ usertype }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => navigate(`/usertypes/${usertype.id_type}`)}>
            <h2>{usertype.type_name}</h2>
        </div>
    );
}