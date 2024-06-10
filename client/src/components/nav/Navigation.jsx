import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout/');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="font-semibold text-lg">Details </div>
            <div>
                <button
                    onClick={() => navigate("/home")}
                    className="bg-white text-blue-600 py-1 px-3 rounded-lg mr-4"
                >
                    Home
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-1 px-3 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navigation;