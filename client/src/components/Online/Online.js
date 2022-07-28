const Online = ({ user }) => {
  const pub = process.env.REACT_APP_PUBLIC;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={pub + user.profilePicture}
          alt={user.username}
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
