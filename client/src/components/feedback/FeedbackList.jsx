import { useEffect, useState } from "react";
import { FeedbackCard } from "./FeedbackCard";
import { Navigation } from "./FeedbackNavigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    async function loadFeedbacks() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/feedback/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setFeedbacks(res.data);
            } else {
                console.log('Error fetching feedbacks');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Credenciales incorrectas.');
            } else if (error.response && error.response.status === 403) {
                console.error('Forbidden:', error.response);
            } else if (error.response && error.response.status === 400) {
                console.error('Bad request:', error.response);
                window.location.reload();
            } else {
                console.error('Error:', error.response);
            }
        }
    };

    useEffect(() => {
        loadFeedbacks();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='grid grid-cols-3 gap-4'>
                {feedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
            </div>
            <Link to="/feedback-create">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Crear Feedback
                </button>
            </Link>
        </div>
    )
}
