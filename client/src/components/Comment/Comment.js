import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/actions/post.action";
import CommentCard from "./CommentCard";

const Comment = ({ post }) => {
  const user = useSelector((state) => state.userReducer);
  const comment = useRef();
  const dispatch = useDispatch();

  const [commentError, setCommentError] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();

    if (comment.current.value !== "") {
      const commentData = {
        author: user.username,
        authorId: user._id,
        content: comment.current.value,
        key: Date.now().toString(),
      };

      dispatch(addComment(post._id, commentData));
      comment.current.value = "";
    } else {
      setCommentError(true);
    }
  };

  return (
    <div className="postBottomRight">
      <div className="comment__top">
        {user ? (
          <form onSubmit={handleComment} className="postCommentText">
            <textarea
              placeholder="Comment Post"
              ref={comment}
              onChange={() => setCommentError(false)}
            ></textarea>
            <div className="comment__top-error">
              <input type="submit" value="Comment" className="green_button" />
              {commentError && <p>Write a comment</p>}
            </div>
          </form>
        ) : (
          <p>You must be connected to comment</p>
        )}
      </div>
      {post.comments.length ? <h5 className="comment__title">Comments</h5> : ""}
      <div className="comment__bottom">
        {post?.comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
