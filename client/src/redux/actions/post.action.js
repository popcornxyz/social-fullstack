import * as api from "../../api";

import {
  CREATE_POST,
  READ_POSTS,
  READ_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
} from "../constants/actionTypes";

// ############################# POSTS #################################

//Get all posts for home feed
export const getPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(userId);

    dispatch({ type: READ_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//Get all posts for profile feed
export const getPostByName = (username) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostByName(username);

    dispatch({ type: READ_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editPost = (editedMessage, postId) => async (dispatch) => {
  try {
    await api.editPost(editedMessage, postId);

    dispatch({
      type: UPDATE_POST,
      payload: { desc: editedMessage, id: postId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);

    dispatch({ type: DELETE_POST, payload: { postId } });
  } catch (error) {
    console.log(error);
  }
};

// ############################# COMMENTS #################################

export const addComment = (postId, commentData) => async (dispatch) => {
  try {
    await api.addComment(postId, commentData);

    dispatch({ type: CREATE_COMMENT, payload: { postId, commentData } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (postId, key) => async (dispatch) => {
  try {
    await api.deleteComment(postId, key);

    dispatch({ type: DELETE_COMMENT, payload: { postId, key } });
  } catch (error) {
    console.log(error);
  }
};

export const editComment = (postId, key, editedComment) => async (dispatch) => {
  try {
    await api.updateComment(postId, key, editedComment);

    dispatch({ type: UPDATE_COMMENT, payload: { postId, key, editedComment } });
  } catch (error) {
    console.log(error);
  }
};

// ############################# LIKES #################################

export const addLike = (postId, userId) => async (dispatch) => {
  try {
    await api.addLike(postId, userId);

    dispatch({ type: ADD_LIKE, payload: { postId, userId } });
  } catch (error) {
    console.log(error);
  }
};

export const removeLike = (postId, userId) => async (dispatch) => {
  try {
    await api.removeLike(postId, userId);

    dispatch({ type: REMOVE_LIKE, payload: { postId, userId } });
  } catch (error) {
    console.log(error);
  }
};
