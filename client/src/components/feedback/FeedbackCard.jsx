import { useNavigate } from 'react-router-dom';
import '../../style/Card.css';

export function FeedbackCard({ feedback, companiesData, studentsData }) {
    const navigate = useNavigate();

    
    // Buscar el nombre del estudiante utilizando su DNI
    const studentName = studentsData.find(student => student.student_dni === feedback.student)?.name;
    // Buscar el nombre de la empresa utilizando su CIF
    const companyName = companiesData.find(company => company.company_cif === feedback.company)?.name;
    return (
        <div className='card-container'
            onClick={() => {
                navigate(`/feedback/${feedback.id}`);
            }}>
            <h2 className='card-title'>Estudiante: {studentName}</h2>
            <h2 className='card-title'>Empresa: {companyName}</h2>
        </div>
    );
}
