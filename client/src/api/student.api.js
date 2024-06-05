import axios from "axios";

export const getAllStudents = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/students/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.log('Error fetching activities: ', error);
        return null;
    };
};



export const getStudentById = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/funciones/api/v1/students/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching student: ', error);
        return null;
    }
};

export const createStudent = async (student) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/funciones/api/v1/students/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error creating student: ', error);
        return null;
    }
};


export const updateStudent = async (id, student) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/students/${id}/`, student, {
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