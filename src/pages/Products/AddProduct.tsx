import { useState } from "react";
import { ApiCreateProduct } from "../../lib/services/Product";
import { sendToast, sendToastError } from "../../configs/Toasts";
import { AuthUser } from "../../contexts/AuthContext";

const AddProduct = () => {

    const { navigate } = AuthUser();

    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        imgURL: '',
    })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await ApiCreateProduct(product);
            const { data } = response;
            if (data.success) {
                sendToast('Product added successfully.');
                navigate('/products');
            } else {
                sendToastError('Failed to add product ....');
            }
        } catch (error) {
            console.error(error);
            sendToastError('Failed to add product.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-center">Add Product</h3>
                <a href="/products" className="block mb-4 text-center text-blue-600 hover:underline">
                    Back to Products
                </a>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            name="name"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={product.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={product.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Price"
                            name="price"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Image URL"
                            name="imgURL"
                            className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={product.imgURL}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-slate-500 w-full py-2 rounded-lg text-white font-semibold hover:bg-blue-700">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
