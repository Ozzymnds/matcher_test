import { useNavigate } from "react-router-dom";

export function UserCard({ user, type }) {
    const navigate = useNavigate();

    const type_name = type.find(type => type.id_type === user.id_type)?.type_name;

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/users/${user.id_user}`);
            }}>
            <h2>{user.user_name}</h2>
            <p>{type_name}</p>
        </div>
    )
}