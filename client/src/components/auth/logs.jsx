import axios from 'axios';

export const login = async ({ username, password, handleShow }) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
            username: username,
            password: password,
        }, {
            withCredentials: true,  // Ensure cookies are sent with the request
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Login successful:', response.data);
        window.location.href = '/home';
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Credenciales incorrectas.');
        } else {
            console.error('Error:', error.message);
        }
        handleShow(true);
    }
};

export const logout = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/logout/', {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Logout successful:', response.data);
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};