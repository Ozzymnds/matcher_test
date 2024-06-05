import axios from "axios";

export const getAllActivities = () => {
    try {
        const res = axios.get('http://127.0.0.1:8000/funciones/api/v1/activities/', {
            withCredentials: true,
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

export const getActivityById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/activities/${id}/`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    } catch (error) {
        console.log('Error fetching activities: ', error);
        return null;
    };
};

export const createActivity = async (activity) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/activities/', activity, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    } catch (error) {
        console.log('Error fetching activities: ', error);
        return null;
    };
};

export const updateActivity = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/activities/${id}/`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    } catch (error) {
        console.log('Error fetching activities: ', error);
        return null;
    };
};

export const deleteActivity = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/activities/${id}/`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    } catch (error) {
        console.log('Error fetching activities: ', error);
        return null;
    };
};