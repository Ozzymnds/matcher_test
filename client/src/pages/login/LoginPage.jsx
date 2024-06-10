import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../components/auth/logs';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showError, setShowError] = useState(false);

    const onSubmit = async (data) => {
        await login({ username: data.username, password: data.password, handleShow: setShowError });
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Username:
                    <input type="text" className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("username", { required: true })} />
                </label>
                {errors.username && <span>This field is required</span>}

                <label>
                    Password:
                    <input type="password" className="bg-gray-200 p-3 rounded-lg block w-full mb-3 text-gray-800" {...register("password", { required: true })} />
                </label>
                {errors.password && <span>This field is required</span>}

                <button className="submit-button" type="submit">Login</button>
            </form>

            {showError && <div className="error">Invalid credentials, please try again.</div>}
        </div>
    );
};

export default LoginForm;