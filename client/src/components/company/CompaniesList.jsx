import { useEffect, useState } from "react";
import { CompanyCard } from "./CompanyCard";
import { Navigation } from "./CompanyNavigation";
import axios from "axios";
import { Link } from "react-router-dom";

export function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [activities, setActivities] = useState([]);

    const loadCompanies = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/companies/', {
                withCredentials: false,
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
    };

    async function loadActivities() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/activities/', {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data) {
                setActivities(res.data);
            } else {
                console.log('Error fetching activities');
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }

    // Con useEffect [] nos aseguramos de que se cargue esta información al renderizar la página
    useEffect(() => {
        loadCompanies();
        loadActivities();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Lista de empresas</h1>
            <div className="grid grid-cols-3 gap-3">
                {companies.map((company) => {
                    return <CompanyCard key={company.company_cif} company={company} activities={activities}/>;
                })}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/companies-create">Crear Empresa</Link>
            </button>
        </div>
    );
}