import { useNavigate } from "react-router-dom";

export function ActivityCard({ activity }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/activities/${activity.activity_id}`);
            }}>
            <h2>{activity.name}</h2>
        </div>
    );
}