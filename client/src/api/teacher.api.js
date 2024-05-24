import axios from "axios";

export const getAllTeachers = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/teachers/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching teachers: ', error);
        return null;
    };
};

export const getTeacherById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/teachers/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching teachers: ', error);
        return null;
    };
};

export const createTeacher = async (teacher) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/teachers/', teacher, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching teachers: ', error);
        return null;
    };
};

export const updateTeacher = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/teachers/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching teachers: ', error);
        return null;
    };
};

export const deleteTeacher = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/teachers/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching teachers: ', error);
        return null;
    };
};