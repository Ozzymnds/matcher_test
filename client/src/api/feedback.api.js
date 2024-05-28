import axios from "axios";

export const getAllFeedbacks = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/feedbacks/', {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error fetching feedbacks: ', error);
        return null;
    };
};

export const getFeedbackById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/feedbacks/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching feedbacks: ', error);
        return null;
    };
};

export const createFeedback = async (feedback) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/feedbacks/', feedback, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching feedbacks: ', error);
        return null;
    };
};

export const updateFeedback = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/feedbacks/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching feedbacks: ', error);
        return null;
    };
};

export const deleteFeedback = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/feedbacks/${id}/`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        return res;
    } catch (error) {
        console.log('Error fetching feedbacks: ', error);
        return null;
    };
};