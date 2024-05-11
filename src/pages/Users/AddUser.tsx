import { useState } from "react";
import { sendToast, sendToastError } from "../../configs/Toasts";
import { AuthUser } from "../../contexts/AuthContext";
import { ApiCreateUsers } from "../../lib/services/User";

const AddUser = () => {

    const { navigate } = AuthUser();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        roles: []
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setUser((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await ApiCreateUsers(user);
            navigate('/users');
            sendToast('User added successfully.');
        } catch (error) {
            sendToastError('Failed to add user.');
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-center">Add User</h3>
                <a href="/users" className="block mb-4 text-center text-blue-600 hover:underline">
                    Back to User
                </a>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="User Name"
                            name="username"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Password"
                            name="password"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Roles"
                            name="roles"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={user.roles}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-slate-500 w-full py-2 rounded-lg text-white font-semibold hover:bg-blue-700">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
