import { Edit, DeleteForever } from "@mui/icons-material";
import { useEffect, useState } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Comment } from "../.";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  editPost,
  addLike,
  removeLike,
} from "../../redux/actions/post.action";
import * as api from "../../api";

const Post = ({ post }) => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [likes, setLikes] = useState(post.likes.length);
  const [postOwner, setPostOwner] = useState({});
  const [postImg, setPostImg] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editedMessage, setEditedMessage] = useState(null);

  const pub = process.env.REACT_APP_PUBLIC;

  const handleEdit = async () => {
    setEdit(false);

    if (editedMessage) {
      dispatch(editPost(editedMessage, post._id));
    }
  };

  const handleDelete = async () => {
    dispatch(deletePost(post._id));
  };

  const handleLikes = async () => {
    if (user) {
      if (post.likes.includes(user._id)) {
        try {
          dispatch(removeLike(post._id, user._id));

          setLikes((prev) => prev - 1);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          dispatch(addLike(post._id, user._id));

          setLikes((prev) => prev + 1);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const fetchPostOwner = async () => {
      //Post Owner
      const { data } = await api.getUserById(post.userId);
      setPostOwner(data);
    };
    fetchPostOwner();

    if (post.img != null) {
      getDownloadURL(ref(storage, post.img)).then((url) => setPostImg(url));
    }
  }, [post]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <NavLink to={`/profile/${postOwner.username}`}>
              <img
                className="postProfileImg"
                src={
                  postOwner.profilePicture
                    ? pub + postOwner.profilePicture
                    : pub + "person/noAvatar.png"
                }
                alt=""
              />
            </NavLink>
            <span className="postUsername">{postOwner.username}</span>
            <span className="postDate">
              {post.createdAt === post.updatedAt
                ? moment(post.createdAt).fromNow()
                : moment(post.updatedAt).fromNow()}
            </span>
          </div>
          {postOwner._id === user?._id && (
            <div className="post__Top-Right">
              <Edit
                onClick={() => setEdit((prev) => !prev)}
                className="post__Top-Right_Icon"
              />
              <DeleteForever
                onClick={handleDelete}
                className="post__Top-Right_Icon"
              />
            </div>
          )}
        </div>
        <div className="postCenter">
          {edit ? (
            <div className="post__center-edit">
              <textarea
                autoFocus
                defaultValue={editedMessage ? editedMessage : post.desc}
                onChange={(e) => setEditedMessage(e.target.value)}
              ></textarea>
              <button className="green_button" onClick={handleEdit}>
                Modify Message
              </button>
            </div>
          ) : (
            <span className="postText">
              {editedMessage && edit ? editedMessage : post.desc}
            </span>
          )}
          <img className="postImg" src={postImg} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${pub}like.png`}
              onClick={handleLikes}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${pub}dislike.png`}
              onClick={handleLikes}
              alt=""
            />
            <span className="postLikeCounter">
              {likes} {likes === 1 ? "person" : "people"} liked it
            </span>
          </div>
          <Comment post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
