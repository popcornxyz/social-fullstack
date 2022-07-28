import * as api from "../../api";

import { FETCH_FRIENDS } from "../constants/actionTypes";

export const getFriends = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchFriends(userId);

    dispatch({ type: FETCH_FRIENDS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
