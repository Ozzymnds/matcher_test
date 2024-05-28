import { useNavigate } from "react-router-dom";

export function UserCard({ user }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/users/${user.id_user}`);
            }}>
            <h2>{user.user_name}</h2>
            <p>{user.id_type}</p>
        </div>
    )
}