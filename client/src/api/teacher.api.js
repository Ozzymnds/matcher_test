import axios from 'axios';

export const getAllTeachers = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/teachers/', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data; // Ensure to return res.data directly
    } catch (error) {
        console.log('Error fetching teachers: ', error);
        return [];
    }
};

export const getTeacherById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/teachers/${id}/`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data; // Ensure to return response.data directly
    } catch (error) {
        console.error('Error fetching teachers by ID: ', error);
        return null;
    }
};

export const createTeacher = async (school) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/teachers/', school, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Created teachers data:', res.data);
        return res.data;
    } catch (error) {
        console.log('Error creating teachers: ', error);
        return null;
    };
};

export const updateTeacher = async (id, school) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/teachers/${id}/`, school, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Updated teachers data:', res.data);
        return res.data;
    } catch (error) {
        console.log('Error updating teachers: ', error);
        return null;
    };
};

export const deleteTeacher = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/teachers/${id}/`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Deleted teachers data:', res.data);
        return res.data;
    } catch (error) {
        console.log('Error deleting teachers: ', error);
        return null;
    };
};
