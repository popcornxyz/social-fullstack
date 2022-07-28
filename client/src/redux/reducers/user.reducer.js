import { FOLLOW, GET_USER, UNFOLLOW } from "../constants/actionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case FOLLOW:
      return {
        ...state,
        followings: [...state.followings, action.payload],
      };
    case UNFOLLOW:
      return {
        ...state,
        followings: state.followings.filter(
          (userId) => userId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
