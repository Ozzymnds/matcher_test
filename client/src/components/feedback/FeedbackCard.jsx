import { useNavigate } from 'react-router-dom';

export function FeedbackCard({ feedback }) {
    const navigate = useNavigate();

    return (
        <div className='bg-zinc-500 p-3 hover:bg-zinc-800 hover:cursor-pointer'
            onClick={() => {
                navigate(`/feedback/${feedback.id}`);
            }}>
                <h2>Feedback de estudiante con DNI: {feedback.student_id} en empresa: {feedback.company_id}</h2>
                <h3>{feedback.company_id}</h3>
                <h3>{feedback.student_id}</h3>
        </div>
    );
}