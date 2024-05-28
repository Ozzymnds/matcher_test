import axios from "axios";

export const getAllUserTypes = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/usertypes/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.log('Error fetching usertypes: ', error);
        return null;
    };
};

export const getUserTypeById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching usertypes: ', error);
        return null;
    };
};

export const createUserType = async (usertype) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/usertypes/', usertype, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching usertypes: ', error);
        return null;
    };
};

export const updateUserType = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching usertypes: ', error);
        return null;
    };
};

export const deleteUserType = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/usertypes/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching usertypes: ', error);
        return null;
    };
};