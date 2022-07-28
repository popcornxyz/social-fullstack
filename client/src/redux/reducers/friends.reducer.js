import { FETCH_FRIENDS } from "../constants/actionTypes";

const friendsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_FRIENDS:
      return action.payload;
    default:
      return state;
  }
};

export default friendsReducer;
