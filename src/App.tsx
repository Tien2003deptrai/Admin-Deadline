import { Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products/Products'
import Employee from './pages/Employees/Employee'
import User from './pages/Users/User'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from './pages/Products/AddProduct'
import UpdateProduct from './pages/Products/UpdateProduct'
import AddUser from './pages/Users/AddUser'
import AddEmployee from './pages/Employees/AddEmployee'
import Login from './pages/Login'
import Register from './pages/Register'
import UpdateEmployee from './pages/Employees/UpdateEmployee'

function App() {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="products" element={<Products />} />
					<Route path="products/add" element={<AddProduct />} />
					<Route path="products/update/:id" element={<UpdateProduct />} />
					<Route path="employees" element={<Employee />} />
					<Route path="employees/add" element={<AddEmployee />} />
					<Route path="employees/update/:id" element={<UpdateEmployee />} />
					<Route path="users" element={<User />} />
					<Route path="users/add" element={<AddUser />} />
				</Route>
			</Routes>
			<ToastContainer />
		</div>
	)
}

export default App
