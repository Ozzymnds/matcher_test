import { useEffect, useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { Navigation } from "./ActivityNavigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function ActivityList() {
    const [activities, setActivities] = useState([]);

    const loadActivities = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/activities/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setActivities(res.data)
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
    }

    useEffect(() => {
        loadActivities();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='grid grid-cols-3 gap-4'>
                {activities.map((activity) => (
                    <ActivityCard key={activity.activity_id} activity={activity} />
                ))}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/activities-create">Crear Actividad</Link>
            </button>
        </div>
    )
}