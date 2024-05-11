import { useEffect, useState } from "react";
import { AuthUser } from "../../contexts/AuthContext";
import { ApiGetUsers } from "../../lib/services/User";

const User = () => {
    const [users, setUsers] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const { navigate } = AuthUser();

    useEffect(() => {
        ApiGetUsers()
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                setFetchError(err);
            })
    }, [])

    return (
        <div>
            <div>
                <button onClick={() => navigate("/users/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add User</button>
                {fetchError && <div>Đã xảy ra lỗi khi tải dữ liệu sản phẩm.</div>}
                {users.length === 0 && <div>Đang tải...</div>}
                {users.length > 0 && (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        UserName
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Roles
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: IUser, index: number) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.roles.join(' - ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
