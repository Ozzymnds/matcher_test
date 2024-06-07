import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const MatchView = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/funciones/match/');
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches(); // Initial fetch

        const interval = setInterval(fetchMatches, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div>
            <h1>Matches</h1>
            <ul>
                {matches.map((match, index) => (
                    <li key={index}>
                        {match.student_name} matched with {match.company_name} for activity {match.activity_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};