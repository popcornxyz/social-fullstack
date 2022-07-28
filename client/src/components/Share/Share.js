import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/actions/post.action";

const Share = () => {
  const pub = process.env.REACT_APP_PUBLIC;

  const user = useSelector((state) => state.userReducer);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      comments: [],
      img: null,
      likes: [],
    };

    if (file) {
      const fileName = Date.now() + file.name;
      newPost.img = fileName;
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, file);
    }

    try {
      dispatch(addPost(newPost));
      desc.current.value = "";
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user?.profilePicture
                ? pub + user.profilePicture
                : pub + "person/noAvatar.png"
            }
            alt={user?.username}
          />
          <input
            placeholder={"What's in your mind " + user?.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
