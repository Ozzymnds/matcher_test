import { useNavigate } from "react-router-dom";

export function PreferenceCard({ preference }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/preferences/${preference.id}`);
            }}>
            <h2>Preferencias para estudiante con DNI: {preference.student_id}</h2>
        </div>
    )
}