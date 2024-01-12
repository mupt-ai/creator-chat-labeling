import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL;

const NewVideo = async (videoUrl: string, creatorId: number) => {
    const res = await axios.post(`${API_URL}/download_video?video_url=${videoUrl}&creator_id=${creatorId}`);
    return res.data;
};

const GetVideos = async (page: number, pageSize: number, creatorId: number) => {
    const res = await axios.get(`${API_URL}/videos?page=${page}&page_size=${pageSize}&creator_id=${creatorId}`);
    return res.data;
}

const DeleteVideo = async (videoId: number) => {
    const res = await axios.delete(`${API_URL}/videos?id=${videoId}`);
    return res.data;
}

const GetPages = async (pageSize: number, creatorId: number) => {
    const res = await axios.get(`${API_URL}/video_pages?page_size=${pageSize}&creator_id=${creatorId}`);
    return res.data;
}

const GetAllVideos = async (creatorId: number) => {
    const res = await axios.get(`${API_URL}/videos?creator_id=${creatorId}`);
    return res.data;
}

export { NewVideo, GetVideos, DeleteVideo, GetPages, GetAllVideos };