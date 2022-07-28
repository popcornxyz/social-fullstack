import { Edit, DeleteForever } from "@mui/icons-material";
import moment from "moment";
import { useState } from "react";
import { deleteComment, editComment } from "../../redux/actions/post.action";
import { useDispatch, useSelector } from "react-redux";

const CommentCard = ({ comment, post }) => {
  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  const user = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(post._id, comment.key));
  };

  const handleEdit = () => {
    dispatch(editComment(post._id, comment.key, editedComment));

    setEdit(false);
  };

  return (
    <>
      <div className="comment__bottom-header">
        <h5>{comment.author}</h5>
        <p>
          {comment.createdAt === comment.updatedAt
            ? moment(comment.createdAt).fromNow()
            : moment(comment.updatedAt).fromNow()}
        </p>
        {comment.authorId === user?._id && (
          <div className="comment_bottom-header_Icons">
            <Edit
              onClick={() => setEdit((prev) => !prev)}
              className="comment__bottom-header_Icons_Icon"
            />
            <DeleteForever
              onClick={handleDelete}
              className="comment__bottom-header_Icons_Icon"
            />
          </div>
        )}
      </div>
      {edit ? (
        <div className="post__center-edit">
          <textarea
            autoFocus
            defaultValue={editedComment ? editedComment : comment.content}
            onChange={(e) => setEditedComment(e.target.value)}
          ></textarea>
          <button onClick={handleEdit} className="green_button">
            Modify
          </button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
    </>
  );
};

export default CommentCard;
