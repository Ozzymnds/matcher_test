import { useEffect, useState } from "react";
import { getAllSchools } from "../../api/school.api";
import { SchoolCard } from "./SchoolCard";
import { Navigation } from "./SchoolNavigation";
import { Link } from "react-router-dom";

export function SchoolList() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        async function loadSchools() {
            try {
                const res = await getAllSchools();
                if (res && res.data) {
                    // console.log(res.data); // Verifica los datos recibidos
                    setSchools(res.data);
                } else {
                    console.log('Error fetching schools');
                }
            } catch (error) {
                console.log('Error fetching schools: ', error);
            }
        }
        loadSchools();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Lista de Escuelas</h1>
            <div className="grid grid-cols-3 gap-3">
                {schools.map((school) => {
                    console.log(school.school_id); // Verifica que los ids sean únicos
                    return <SchoolCard key={school.school_id} school={school} />;
                })}
            </div>
            <button className="bg-green-500 px-3 py-3 rounded-lg mt3">
                <Link to="/schools-create">Crear Escuela</Link>
            </button>
        </div>
    );
};
