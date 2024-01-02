import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL;

const NewTrainingData = async (creatorId: number, numQuestions: number, videoId: number) => {
    const params = new URLSearchParams();
    params.append('creator_id', creatorId.toString());
    params.append('num_questions', numQuestions.toString());
    params.append('video_id', videoId.toString());
    const res = await axios.post(`${API_URL}/training_data`, params);
    return res.data;
};

const GetTrainingData = async (creatorId: number, page: number, pageSize: number) => {
    const params = new URLSearchParams();
    params.append('creator_id', creatorId.toString());
    params.append('page', page.toString());
    params.append('page_size', pageSize.toString());
    const res = await axios.get(`${API_URL}/training_data`, { params });
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

export { NewTrainingData, GetTrainingData, DeleteTrainingData, EditTrainingData };