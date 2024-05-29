import { useNavigate } from "react-router-dom";

export function StudentCard({ student, teacher, company }) {
    const navigate = useNavigate();

    const teacherName = teacher.find(teacher => teacher.teacher_dni === student.teacher_id)?.name;
    const companyName = company.find(company => company.company_cif === student.company_id)?.name;

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
            <p>{teacherName}</p>
            <p>{companyName}</p>
        </div>
    );
}