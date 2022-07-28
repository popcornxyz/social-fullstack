import axios from "axios";

const url_posts = "http://localhost:5000/posts";
const url_users = "http://localhost:5000/users";

// ############################# POSTS #################################

export const fetchPosts = (userId) => axios.get(`${url_posts}/home/${userId}`);
export const fetchPostByName = (username) =>
  axios.get(`${url_posts}/profile/${username}`);

export const createPost = (post) => axios.post(url_posts, post);

export const editPost = (editedMessage, postId) =>
  axios.put(`${url_posts}/${postId}`, { editedMessage });

export const deletePost = (postId) => axios.delete(`${url_posts}/${postId}`);

// ############################# USERS #################################

export const addUser = (email, username, id) =>
  axios.post(url_users + "/register", { email, username, id });

export const getUserById = (userId) =>
  axios.get(`${url_users}/userId/${userId}`);
export const getUserByName = (username) =>
  axios.get(`${url_users}/username/${username}`);
export const fetchFriends = (userId) =>
  axios.get(`${url_users}/friends/${userId}`);

export const followUser = (userId, currentUserId) =>
  axios.put(`${url_users}/follow/${userId}`, { currentUserId });
export const unfollowUser = (userId, currentUserId) =>
  axios.put(`${url_users}/unfollow/${userId}`, { currentUserId });

// ############################# COMMENTS #################################

export const addComment = (postId, commentData) =>
  axios.put(`${url_posts}/comment/add/${postId}`, { commentData });
export const deleteComment = (postId, key) =>
  axios.put(`${url_posts}/comment/delete/${postId}`, { key });
export const updateComment = (postId, key, editedComment) =>
  axios.put(`${url_posts}/comment/update/${postId}`, {
    editedComment,
    key,
  });

// ############################# LIKES #################################

export const addLike = (postId, userId) =>
  axios.put(`${url_posts}/like/add/${postId}`, { userId });
export const removeLike = (postId, userId) =>
  axios.put(`${url_posts}/like/remove/${postId}`, { userId });
