import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Card.css';
export function ActivityCard({ activity }) {
    const navigate = useNavigate();

    return (
        <div
            className='card-container'
            onClick={() => {
                navigate(`/activities/${activity.activity_id}`);
            }}
        >
            <h2 className='card-title'>{activity.name}</h2>
        </div>
    );
}