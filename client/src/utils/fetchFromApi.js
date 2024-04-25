import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
    headers: {
        token: localStorage.getItem("ACCESS_TOKEN"),
    },
};

export const getUserInfo = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data.data;
}

export const uploadPhotoApi = async (model, url) => {
    const { data } = await axios.post(`${BASE_URL}/${url}`, model, options);
    return data.data;
}

export const getPhotos = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`);
    return data;
}
