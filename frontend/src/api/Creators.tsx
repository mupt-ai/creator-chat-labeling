import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL;

const newCreator = async (creatorName: string) => {
    const res = await axios.post(`${API_URL}/creators?creatorName=${creatorName}`);
    return res.data;
};

const getCreators = async () => {
    const res = await axios.get(`${API_URL}/creators`);
    return res.data;
}

export { newCreator, getCreators };
