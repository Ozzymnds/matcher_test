import axios from 'axios';
import Cookies from 'js-cookie'
import { axios_client } from '../../api/apiconfig';

axios.defaults.withCredentials = true;


export const login = async ({ username, password, handleShow }) => {
    try {
        const response = await axios_client.post('/auth/login/', {
            username: username,
            password: password,
        });
        console.log('Login successful:', response);
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

// export const logout = async () => {

//     try {

//         const response = await axios.post('http://127.0.0.1:8000/auth/logout/', {
//             withCredentials: true,
//             xsrfCookieName: "csrftoken",
//             xsrfHeaderName: "X-CSRFToken",
//             headers: {
//                 "X-CSRFToken": Cookies.get('csrftoken'),
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log('Logout successful:', response.data);
//         window.location.href = '/login';

//     } catch (error) {
//         console.error('Error during logout:', error.message);
//     }
// };

export const logout = async () => {
    try {
        const csrftoken = Cookies.get('csrftoken');

        if (!csrftoken) {
            throw new Error('CSRF token not found.');
        }

        const response = await axios_client.post('/auth/logout/');

        console.log('Logout successful:', response.data);
        window.location.href = '/login';

    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};