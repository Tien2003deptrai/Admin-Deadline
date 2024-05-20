import axios from 'axios';

const API_BE = 'http://localhost:4000/api/employee';

export const ApiGetEmployee = async () => {
    const res = await axios.get(`${API_BE}/`);
    return res.data;
};

export const ApiCreateEmployee = async (employee: any) => {
    const res = await axios.post(`${API_BE}/`, employee);
    return res;
};

export const ApiUpdateEmployee = async (id: any, employee: any) => {
    const res = await axios.put(`${API_BE}/${id}`, employee);
    return res;
};

export const ApiDeleteEmployee = async (id: string) => {
    const res = await axios.delete(`${API_BE}/${id}`);
    return res;
};


export const ApiGetOneEmployee = async (id: any) => {
    const res = await axios.get(`${API_BE}/${id}`);
    return res.data;
};
