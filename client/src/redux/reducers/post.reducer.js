import {
  CREATE_POST,
  READ_POSTS,
  READ_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  REMOVE_LIKE,
  ADD_LIKE,
} from "../constants/actionTypes";

const postReducer = (state = [], action) => {
  switch (action.type) {
    // ############################# POSTS #################################
    case READ_POSTS:
    case READ_POST:
      return action.payload;
    case CREATE_POST:
      return [...state, action.payload];
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.id) {
          return {
            ...post,
            desc: action.payload.desc,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    // ############################# COMMENTS #################################
    case CREATE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: [...post.comments, action.payload.commentData],
          };
        } else return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.key !== action.payload.key
            ),
          };
        } else return post;
      });
    case UPDATE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.key === action.payload.key) {
                return {
                  ...comment,
                  content: action.payload.editedComment,
                };
              } else return comment;
            }),
          };
        } else return post;
      });
    // ############################# LIKES #################################
    case ADD_LIKE:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likes: [...post.likes, action.payload.userId],
          };
        } else return post;
      });
    case REMOVE_LIKE:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likes: post.likes.filter(
              (userId) => userId !== action.payload.userId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
};

export default postReducer;
