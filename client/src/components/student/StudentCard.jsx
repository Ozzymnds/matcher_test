import { useNavigate } from "react-router-dom";

export function StudentCard({ student }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/students/${student.student_dni}`);
            }}>
            <h2>{student.name}</h2>
            <p>{student.last_name}</p>
            <p>{student.student_dni}</p>
            <p>{student.school_email}</p>
            <p>{student.address}</p>
            <p>{student.school_id}</p>
            <p>{student.teacher_id}</p>
            <p>{student.company_id}</p>
        </div>
    );
}