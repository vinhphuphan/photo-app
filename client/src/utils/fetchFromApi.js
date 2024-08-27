import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const getHeaders = () => {
  return {
    headers: {
      token: localStorage.getItem("ACCESS_TOKEN"),
    },
  };
};

// User API

export const getUserInfo = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, getHeaders());
  return data.data;
}

export const getUserInfoByUserName = async (user_name) => {
  const { data } = await axios.get(`${BASE_URL}/users/by-user-name/${user_name}`);
  return data;
}

export const updateUserInfo = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/users/upload-info`, model, getHeaders())
  return data;
}

export const getFollowersByUserName = async (user_name) => {
  const { data } = await axios.get(`${BASE_URL}/users/get-followers-by-user-name/${user_name}`)
  return data;
}

// -----------------------------------------------------------------------------------------

// Photo API

export const uploadPhotoApi = async (model, url) => {
  const { data } = await axios.post(`${BASE_URL}/${url}`, model, getHeaders());
  return data.data;
}

export const getPhotos = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
}

export const getPhotoDetails = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/photos/by-photo-id/${id}`);
  return data;
}

export const getSavedPhotoByUser = async (user_name) => {
  const { data } = await axios.get(`${BASE_URL}/photos/saved-by-user-name/${user_name}`);
  return data;
}

export const getCreatedPhotoByUser = async (user_name) => {
  const { data } = await axios.get(`${BASE_URL}/photos/created-by-user-name/${user_name}`);
  return data;
}

export const searchPhotos = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/photos/search/${query}`);
  return data;
}

export const checkSave = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/photos/check-save/${id}`, getHeaders());
  return data.data;
}

export const savePhoto = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/photos/save-photo`, model, getHeaders());
  return data.data;
}

// -----------------------------------------------------------------------------------------

// Comment API

export const getCommentsByPhotoId = async (photo_id) => {
  const { data } = await axios.get(`${BASE_URL}/comments/${photo_id}`, getHeaders());
  return data.data;
}

export const createComment = async (photo_id, model) => {
  const { data } = await axios.post(`${BASE_URL}/comments/${photo_id}`, model, getHeaders());
  return data.data;
}

export const createReply = async (parent_comment_id, model) => {
  const { data } = await axios.post(`${BASE_URL}/comments/reply_comment/${parent_comment_id}`, model, getHeaders());
  return data;
}

// -----------------------------------------------------------------------------------------

// Follow API

export const followUser = async (followed_id) => {
  const { data } = await axios.post(`${BASE_URL}/follows/${followed_id}`,{}, getHeaders());
  return data;
}

export const unFollowUser = async (followed_id) => {
  const { data } = await axios.delete(`${BASE_URL}/follows/${followed_id}`, getHeaders());
  return data;
}

export const checkFollow = async (followed_id) => {
  const { data } = await axios.get(`${BASE_URL}/follows/check_follow/${followed_id}`, getHeaders());
  return data;
}

// -----------------------------------------------------------------------------------------

// Reaction API

export const getReactionForUser = async (photo_id) => {
  const { data } = await axios.get(`${BASE_URL}/reactions/${photo_id}`, getHeaders()) ;
  return data;
}

export const getReactionCount = async (photo_id) => {
  const { data } = await axios.get(`${BASE_URL}/reactions/count/${photo_id}`);
  return data;
}

export const getReactionType = async (photo_id) => {
  const { data } = await axios.get(`${BASE_URL}/reactions/types/${photo_id}`);
  return data;
}

export const createReaction = async (photo_id, model) => {
  const { data } = await axios.post(`${BASE_URL}/reactions/${photo_id}`, model, getHeaders());
  return data;
}

export const deleteReaction = async (photo_id) => {
  const { data } = await axios.delete(`${BASE_URL}/reactions/${photo_id}`, getHeaders());
  return data;
}

export const updateReaction = async (photo_id, model) => {
  const { data } = await axios.put(`${BASE_URL}/reactions/${photo_id}`, model, getHeaders());
  return data;
}


