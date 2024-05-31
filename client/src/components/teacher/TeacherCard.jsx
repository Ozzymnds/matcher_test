import { useNavigate } from "react-router-dom";
import '../../style/Card.css';

export function TeacherCard({ teacher, school }) {
    const navigate = useNavigate();

    const school_name = school.find(school => school.school_id === teacher.school_id)?.name;

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/teachers/${teacher.teacher_dni}`);
            }}>
            <h2 className='card-title'>{teacher.name}</h2>
            <p>{teacher.teacher_dni}</p>
            <p>{teacher.last_name}</p>
            <p>{teacher.phone_number}</p>
            <p>{teacher.school_mail}</p>
            <p>{school_name}</p>
        </div>
    );
}