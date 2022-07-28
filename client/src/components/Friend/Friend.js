import { NavLink } from "react-router-dom";

const Friend = ({ friend }) => {
  const pub = process.env.REACT_APP_PUBLIC;

  return (
    <NavLink
      to={"/profile/" + friend.username}
      style={{ textDecoration: "none" }}
    >
      <div className="rightbarFollowing">
        <img
          src={
            friend.profilePicture
              ? pub + friend.profilePicture
              : pub + "person/noAvatar.png"
          }
          alt=""
          className="rightbarFollowingImg"
        />
        <span className="rightbarFollowingName">{friend.username}</span>
      </div>
    </NavLink>
  );
};

export default Friend;
