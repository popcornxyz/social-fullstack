const CloseFriend = ({ user }) => {
  const pub = process.env.REACT_APP_PUBLIC;

  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={pub + user.profilePicture}
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
