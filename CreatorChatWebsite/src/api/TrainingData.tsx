import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL;

const NewTrainingData = async (creatorId: number, numQuestions: number, videoId: string) => {
    const res = await axios.post(`${API_URL}/training_data?creator_id=${creatorId.toString()}&n_questions=${numQuestions.toString()}&video_id=${videoId}`);
    return res.data;
};

const GetTrainingData = async (creatorId: number, page: number, pageSize: number) => {
    const res = await axios.get(`${API_URL}/training_data?creator_id=${creatorId}&page=${page}&page_size=${pageSize}`);
    return res.data;
}

const DeleteTrainingData = async (trainingDataId: number) => {
    const res = await axios.delete(`${API_URL}/training_data?id=${trainingDataId}`);
    return res.data;
}

const EditTrainingData = async (trainingDataId: number, question: string, answer: string) => {
    const params = new URLSearchParams();
    params.append('id', trainingDataId.toString());
    params.append('question', question);
    params.append('answer', answer);
    const res = await axios.put(`${API_URL}/training_data`, params);
    return res.data;
}

const GetPages = async (pageSize: number, creatorId: number) => {
    const params = new URLSearchParams();
    params.append('page_size', pageSize.toString());
    params.append('creator_id', creatorId.toString());
    const res = await axios.get(`${API_URL}/training_data_pages`, { params });
    return res.data;
}

export { NewTrainingData, GetTrainingData, DeleteTrainingData, EditTrainingData, GetPages };