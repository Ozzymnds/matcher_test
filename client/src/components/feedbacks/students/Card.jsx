import { useNavigate } from "react-router-dom";
import '../../../style/Card.css';

export function Card({ studentfeedback, student }) {
    const navigate = useNavigate();

    const studentName = student.find(student => student.student_dni === studentfeedback.author)?.name

    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/studentfeedback/${studentfeedback.id}`);
            }}>
            <h2 className='card-title' >{studentfeedback.title}</h2>
            <p>{studentName}</p>
            <p>{studentfeedback.created_on}</p>
            <p>{studentfeedback.created_on}</p>
        </div>
    )
}