import { useNavigate } from "react-router-dom";

export function PreferenceCard({ preference, activities, students }) {
    const navigate = useNavigate();

    const activityName = activities.find(activity => activity.activity_id === preference.activity)?.name;
    const studentName = students.find(student => student.student_dni === preference.student)?.name;

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/preferences/${preference.id}`);
            }}>
            <h2>Preferencia para estudiante: {studentName}</h2>
            <h2>Nombre de la actividad elegida: {activityName}</h2>
        </div>
    );
}