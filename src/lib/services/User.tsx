import axios from 'axios';

const API_BE = 'http://localhost:4000/api/users';

export const ApiGetUsers = async () => {
    const res = await axios.get(`${API_BE}/`);
    return res.data;
};

export const ApiCreateUsers = async (user: any) => {
    const res = await axios.post(`${API_BE}/`, user);
    return res;
};

export const ApiGetOneUsers = async (id: any) => {
    const res = await axios.post(`${API_BE}/${id}`);
    return res;
};
