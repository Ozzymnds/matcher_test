import { useNavigate } from "react-router-dom";
import '../../style/Card.css';

export function PreferenceCard({ preference, activities, students }) {
    const navigate = useNavigate();

    const activityName = activities.find(activity => activity.activity_id === preference.activity)?.name;
    const studentName = students.find(student => student.student_dni === preference.student)?.name;

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/preferences/${preference.id}`);
            }}>
            <h2 className='card-title'>Preferencia para estudiante: {studentName}</h2>
            <h2 className='card-title'>Nombre de la actividad elegida: {activityName}</h2>
        </div>
    );
}