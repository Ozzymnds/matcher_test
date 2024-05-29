import { useNavigate } from 'react-router-dom';

export function FeedbackCard({ feedback, companiesData, studentsData }) {
    const navigate = useNavigate();

    
    // Buscar el nombre del estudiante utilizando su DNI
    const studentName = studentsData.find(student => student.student_dni === feedback.student)?.name;
    // Buscar el nombre de la empresa utilizando su CIF
    const companyName = companiesData.find(company => company.company_cif === feedback.company)?.name;
    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/feedback/${feedback.id}`);
            }}>
            <h2>Estudiante: {studentName}</h2>
            <h2>Empresa: {companyName}</h2>
        </div>
    );
}
