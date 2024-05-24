import axios from "axios";

export const getAllPreferences = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/preferences/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching preferences: ', error);
        return null;
    };
};

export const getPreferenceById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/preferences/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching preferences: ', error);
        return null;
    };
};

export const createPreference = async (preference) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/preferences/', preference, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching preferences: ', error);
        return null;
    };
};

export const updatePreference = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/preferences/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching preferences: ', error);
        return null;
    };
};

export const deletePreference = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/preferences/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching preferences: ', error);
        return null;
    };
};