import * as api from "../../api";

import { FOLLOW, GET_USER, UNFOLLOW } from "../constants/actionTypes";

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserById(id);

    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (userId, currentUserId) => async (dispatch) => {
  try {
    await api.followUser(userId, currentUserId);

    dispatch({ type: FOLLOW, payload: userId });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = (userId, currentUserId) => async (dispatch) => {
  try {
    await api.unfollowUser(userId, currentUserId);

    dispatch({ type: UNFOLLOW, payload: userId });
  } catch (error) {
    console.log(error);
  }
};
