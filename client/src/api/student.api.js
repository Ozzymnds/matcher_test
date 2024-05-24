import axios from "axios";

export const getAllStudents = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/students/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching students: ', error);
        return null;
    };
};

export const getStudentById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/students/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching students: ', error);
        return null;
    };
};

export const createStudent = async (student) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/students/', student, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching students: ', error);
        return null;
    };
};

export const updateStudent = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/students/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching students: ', error);
        return null;
    };
};

export const deleteStudent = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/students/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching students: ', error);
        return null;
    };
};