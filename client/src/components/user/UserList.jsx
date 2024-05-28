import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { Navigation } from "./UserNavigation";
import axios from "axios";
import { Link } from "react-router-dom";


export function UserList() {
    const [users, setUsers] = useState([]);

    async function loadUsers() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/users/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setUsers(res.data);
            } else {
                console.log('Error fetching users');
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
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='grid grid-cols-3 gap-4'>
                {users.map((user) => (
                    <UserCard key={user.id_user} user={user} />
                ))}
            </div>
            <Link to="/users-create">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Crear Usuario
                </button>
            </Link>
        </div>
    )
}