import { useNavigate } from 'react-router-dom';

export function SchoolCard({ school }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/schools/${school.school_id}`);
            }}>
            <h2>{school.name}</h2>
            <p>{school.address}</p>
        </div>
    );
};