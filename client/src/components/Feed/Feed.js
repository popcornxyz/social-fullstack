import { useEffect } from "react";
import { Post, Share } from "../";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostByName } from "../../redux/actions/post.action";

const Feed = ({ username }) => {
  const user = useSelector((state) => state.userReducer);
  const profilePosts = useSelector((state) => state.postReducer);
  const homePosts = useSelector((state) => state.postReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(getPostByName(username));
    } else {
      if (user?._id) dispatch(getPosts(user._id));
    }
  }, [username, user?._id, dispatch]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}

        {homePosts.length && !username
          ? homePosts
              ?.sort((a, b) => new Date(b.created) - new Date(a.created))
              .map((post) => <Post key={post._id} post={post} />)
          : profilePosts
              ?.sort((a, b) => new Date(b.created) - new Date(a.created))
              .map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
