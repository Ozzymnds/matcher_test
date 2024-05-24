import axios from 'axios';

export const getAllSchools = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/schools/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching schools: ', error);
        return null;
    }
};

export const getSchoolById = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/schools/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching school by ID: ', error);
        return null; // O maneja el error de una manera apropiada
    }
};

export const createSchool = async (school) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/schools/', school, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error creating schools: ', error);
        return null;
    };
};

export const updateSchool = async (id, school) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/schools/${id}/`, school, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error updating schools: ', error);
        return null;
    };
};

export const deleteSchool = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/schools/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error deleting schools: ', error);
        return null;
    };
};