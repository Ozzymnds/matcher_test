import React, { useState } from 'react';
import LoginForm from './LoginPage';
import Register from '../../components/auth/register';

const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
                <div className="flex justify-around mb-6">
                    <button
                        onClick={() => setShowLogin(true)}
                        className={`p-3 rounded-lg w-1/2 ${showLogin ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setShowLogin(false)}
                        className={`p-3 rounded-lg w-1/2 ${!showLogin ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Register
                    </button>
                </div>
                {showLogin ? <LoginForm /> : <Register />}
            </div>
        </div>
    );
};

export default AuthPage;
