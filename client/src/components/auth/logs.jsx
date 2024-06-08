import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export const login = async ({ username, password, handleShow }) => {
    try {
        const response = await axios.post('http://127.0.0.1:80/api/auth/login/', {
            username: username,
            password: password,
        });
        console.log('Login successful:', response.data);

        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = '/home';
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response);
            if (error.response.status === 401) {
                console.log('Credenciales incorrectas.');
            } else if (error.response.status === 404) {
                console.error('Ruta no encontrada.');
            } else {
                console.error('Error de servidor:', error.response.status);
            }
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('General error:', error.message);
        }
        handleShow(true);
    }
};

export const logout = async () => {
    try {
        const csrftoken = Cookies.get("csrftoken");
        const response = await axios.post('http://127.0.0.1:8000/auth/logout/', { withCredentials: true }, {
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            }
        });
        console.log('Logout successful:', response.data);

        // Limpia el estado de autenticación
        localStorage.removeItem('isAuthenticated');

        // Redirige a la página de login
        window.location.href = '/login';
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('General error:', error.message);
        }
    }
};