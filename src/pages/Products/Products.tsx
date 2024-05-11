import { useEffect, useState } from "react";
import { AuthUser } from "../../contexts/AuthContext";
import { ApiDeleteProduct, ApiGetProducts } from "../../lib/services/Product";
import { IProduct } from "../../utils/IProduct";
import { sendToast, sendToastError } from "../../configs/Toasts";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [fetchError, setFetchError] = useState(null);
	const { navigate } = AuthUser();

	useEffect(() => {
		ApiGetProducts()
			.then(res => {
				setProducts(res.data);
			})
			.catch(err => {
				setFetchError(err);
			})
	}, [])

	const handleDeleteProduct = async (id: any) => {
		try {
			await ApiDeleteProduct(id);
			window.location.reload();
			sendToast('Deleted product successfully.');
		} catch (error) {
			setProducts(products);
			sendToastError('Failed to delete product.');
		}
	}

	return (
		<div>
			<div>
				<button onClick={() => navigate("/products/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Product</button>
				{fetchError && <div>Đã xảy ra lỗi khi tải dữ liệu sản phẩm.</div>}
				{products.length === 0 && <div>Đang tải...</div>}
				{products.length > 0 && (
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3">
										STT
									</th>
									<th scope="col" className="px-6 py-3">
										NAME
									</th>
									<th scope="col" className="px-6 py-3">
										Category
									</th>
									<th scope="col" className="px-6 py-3">
										Price
									</th>
									<th scope="col" className="px-6 py-3">
										Image
									</th>
									<th scope="col" className="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product: IProduct, index: number) => (
									<tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{index + 1}
										</th>
										<td className="px-6 py-4">{product.name}</td>
										<td className="px-6 py-4">{product.category}</td>
										<td className="px-6 py-4">${product.price}</td>
										<td className="px-6 py-4">
											<img src={product.imgURL} alt={product.name} className="max-w-[60px] max-h-[60px]" />
										</td>
										<td className="px-6 py-4">
											<button onClick={() => navigate(`/products/update/${product._id}`)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
											<button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
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

export default Products;
