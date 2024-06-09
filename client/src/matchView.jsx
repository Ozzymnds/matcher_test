import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchView = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:80/api/funciones/match/');
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches(); // Initial fetch

        const interval = setInterval(fetchMatches, 500);

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

export default MatchView;