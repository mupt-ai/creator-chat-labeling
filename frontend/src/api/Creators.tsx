import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL;

const NewCreator = async (creatorName: string) => {
    const res = await axios.post(`${API_URL}/creators?name=${creatorName}`);
    return res.data;
};

const GetCreators = async () => {
    const res = await axios.get(`${API_URL}/creators`);
    return res.data;
}

export { NewCreator, GetCreators };
