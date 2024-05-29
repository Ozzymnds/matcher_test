import { useNavigate } from "react-router-dom";

export function TeacherCard({ teacher, school }) {
    const navigate = useNavigate();

    const school_name = school.find(school => school.school_id === teacher.school_id)?.name;

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/teachers/${teacher.teacher_dni}`);
            }}>
            <h2>{teacher.name}</h2>
            <p>{teacher.teacher_dni}</p>
            <p>{teacher.last_name}</p>
            <p>{teacher.phone_number}</p>
            <p>{teacher.school_mail}</p>
            <p>{school_name}</p>
        </div>
    );
}