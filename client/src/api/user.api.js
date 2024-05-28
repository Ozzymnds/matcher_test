import axios from "axios";

export const getAllUsers = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/users/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching users: ', error);
        return null;
    };
};

export const getUserById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/users/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching users: ', error);
        return null;
    };
};

export const createUser = async (user) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/users/', user, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching users: ', error);
        return null;
    };
};

export const updateUser = async (id, user) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/users/${id}/`, user, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.log('Error fetching users: ', error);
        return null;
    };
};

export const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/users/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("eliminado");
        return res;
    } catch (error) {
        console.log('Error fetching users: ', error);
        return null;
    };
};