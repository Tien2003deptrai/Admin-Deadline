import axios from 'axios';

const API_BE = 'http://localhost:4000/api/products';


export const ApiGetProducts = async () => {
    const res = await axios.get(`${API_BE}/`);
    return res.data;
};

export const ApiGetOneProduct = async (id: any) => {
    const res = await axios.get(`${API_BE}/${id}`);
    return res.data;
};

export const ApiCreateProduct = async (product: any) => {
    const res = await axios.post(`${API_BE}/`, product);
    return res;
};


export const ApiUpdateProduct = async (id: any, product: any) => {
    const res = await axios.put(`${API_BE}/${id}`, product);
    return res;
};

export const ApiDeleteProduct = async (id: any) => {
    const res = await axios.delete(`${API_BE}/${id}`);
    return res;
};