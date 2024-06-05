import { useNavigate } from "react-router-dom";
import '../../../style/Card.css';

export function Card({ teacherfeedback, teacher }) {
    const navigate = useNavigate();

    const teacherName = teacher.find(teacher => teacher.teacher_dni === teacherfeedback.author)?.name

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/teacherfeedback/${teacherfeedback.id}`);
            }}>
            <h2 className='card-title' >{teacherfeedback.title}</h2>
            <p>{teacherName}</p>
            <p>{teacherfeedback.created_on}</p>
            <p>{teacherfeedback.created_on}</p>
        </div>
    )
}