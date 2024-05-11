import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthUser } from '../../contexts/AuthContext';
import { ApiCreateEmployee } from '../../lib/services/Employee';
import { sendToast, sendToastError } from '../../configs/Toasts';

const AddEmployee = () => {
    const { navigate } = AuthUser();

    const [employee, setEmployee] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        vacationDays: '',
        paidToDate: '',
        paidLastYear: '',
        payRate: '',
        payRateId: ''
    });
    console.log('employee created', employee);


    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await ApiCreateEmployee(employee);
            sendToast('Employee added successfully.');
            navigate('/employees');

        } catch (error) {
            sendToastError('Failed to add employee.');
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl mb-6 font-semibold text-center">Add New Employee</h2>
                <Link to="/employees" className="block text-center mb-6 text-blue-600 hover:underline">Back to Employee List</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="employeeId" className="block text-gray-700">Employee Id</label>
                            <input type="text" id="employeeId" name="employeeId" placeholder="Enter employee Id"
                                value={employee.employeeId}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full h-[px]" />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                            <input type="text" id="firstName" name="firstName" placeholder="Enter first name"
                                value={employee.firstName}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Enter last name"
                                value={employee.lastName}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                        <div>
                            <label htmlFor="vacationDays" className="block text-gray-700">Vacation Days</label>
                            <input type="number" id="vacationDays" name="vacationDays" placeholder="Enter vacation days"
                                value={employee.vacationDays}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                    </form>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="paidToDate" className="block text-gray-700">Paid to Date</label>
                            <input type="text" id="paidToDate" name="paidToDate" placeholder="Enter paid to date"
                                value={employee.paidToDate}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                        <div>
                            <label htmlFor="paidLastYear" className="block text-gray-700">Paid Last Year</label>
                            <input type="text" id="paidLastYear" name="paidLastYear" placeholder="Enter paid last year"
                                value={employee.paidLastYear}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                        <div>
                            <label htmlFor="payRate" className="block text-gray-700">Pay Rate</label>
                            <input type="text" id="payRate" name="payRate" placeholder="Enter paid pay rate"
                                value={employee.payRate}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                        <div>
                            <label htmlFor="payRateId" className="block text-gray-700">Pay Rate Id</label>
                            <input type="text" id="payRateId" name="payRateId" placeholder="Enter paid pay rate id"
                                value={employee.payRateId}
                                onChange={handleInputChange}
                                className="form-input mt-1 block w-full" />
                        </div>
                        <div className='mt-6 text-center justify-center'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
                            <button type="reset" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Reset</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddEmployee;
