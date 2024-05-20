import { useEffect, useState } from "react";
import { AuthUser } from "../../contexts/AuthContext";
import { ApiDeleteEmployee, ApiGetEmployee } from "../../lib/services/Employee";
import { IEmployee } from "../../utils/IEmployee";
import { sendToast, sendToastError } from "../../configs/Toasts";

const Employee = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [fetchError, setFetchError] = useState(null);
    const { navigate } = AuthUser();

    useEffect(() => {
        ApiGetEmployee()
            .then(res => {
                setEmployees(res.data);
            })
            .catch(err => {
                setFetchError(err);
            })
    }, [])

    const handleDeleteEmployee = async (id: any) => {
        try {
            await ApiDeleteEmployee(id);
            sendToast('Deleted employee successfully.');

            const updatedEmployees = employees.filter(employee => employee._id !== id);
            setEmployees(updatedEmployees);

        } catch (error) {
            sendToastError('Failed to delete employee.');
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => navigate("/employees/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Employee</button>
                {fetchError && <div>Đã xảy ra lỗi khi tải dữ liệu sản phẩm.</div>}
                {employees.length === 0 && <div>Đang tải...</div>}
                {employees.length > 0 && (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        EmployeeID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Vacation Days
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Paid To Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Paid Last Year
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Pay Rate
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee: IEmployee, index: number) => (
                                    <tr key={employee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th key={index} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {employee.employeeId}
                                        </th>
                                        <td className="px-6 py-4">{employee.firstName}{employee.lastName}</td>
                                        <td className="px-6 py-4">{employee.vacationDays}</td>
                                        <td className="px-6 py-4">${employee.paidToDate}</td>
                                        <td className="px-6 py-4">${employee.paidLastYear}</td>
                                        <td className="px-6 py-4">${employee.payRate}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => navigate(`/employees/update/${employee._id}`)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
                                            <button onClick={() => handleDeleteEmployee(employee._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                        </td>
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

export default Employee;
