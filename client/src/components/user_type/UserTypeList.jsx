import { useEffect, useState } from "react";
import { UserTypeCard } from "./UserTypeCard";
import { Navigation } from "./UserTypeNavigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function UserTypeList() {
    const [usertypes, setUserTypes] = useState([]);

    const loadUserTypes = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/usertypes/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setUserTypes(res.data)
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
        loadUserTypes();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='grid grid-cols-3 gap-4'>
                {usertypes.map((usertype) => (
                    <UserTypeCard key={usertype.id_type} usertype={usertype} />
                ))}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/usertypes-create">Crear Tipo de Usuario</Link>
            </button>
        </div>
    )
}