import axios from "axios";

export const getAllCompanies = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/funciones/api/v1/companies/', {
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
    };
};

export const getCompanyById = async (id) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/funciones/api/v1/companies/${id}/`, {
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
    };
};

export const createCompany = async (company) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/funciones/api/v1/companies/', company, {
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
    };
};

export const updateCompany = async (id) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/funciones/api/v1/companies/${id}/`, {
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
    };
};

export const deleteCompany = async (id) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/funciones/api/v1/companies/${id}/`, {
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
    };
};