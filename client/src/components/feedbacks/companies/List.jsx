import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Navigation } from "./Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function List() {
    const [companyfeedback, setCompaniesfeedback] = useState([]);
    const [company, setCompanies] = useState([]);

    const loadCompanies = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/companies/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCompanies(res.data);
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

    const loadCompaniesFeedback = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:80/api/funciones/api/v1/companyfeedback/', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCompaniesfeedback(res.data);
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
        loadCompanies();
        loadCompaniesFeedback();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Feedback de empresas</h1>
            <div className="grid grid-cols-3 gap-3">
                {companyfeedback.map((companyfeedback) => {
                    return <Card key={companyfeedback.id} companyfeedback={companyfeedback} company={company} />
                })}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/companyfeedback-create">Nueva reseña</Link>
            </button>
        </div>

    )
}