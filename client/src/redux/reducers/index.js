import { combineReducers } from "redux";
import postReducer from "./post.reducer";
import friendsReducer from "./friends.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  friendsReducer,
});

export default rootReducer;
