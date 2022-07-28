import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Friend } from "../.";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../redux/actions/friends.action";
import { unfollowUser, followUser } from "../../redux/actions/user.action";

const ProfileRightbar = ({ user }) => {
  const dispatch = useDispatch();

  const friends = useSelector((state) => state.friendsReducer);
  const currentUser = useSelector((state) => state.userReducer);

  const [followed, setFollowed] = useState(null);

  useEffect(() => {
    if (user?._id) dispatch(getFriends(user._id));
  }, [user, dispatch]);

  useEffect(() => {
    setFollowed(currentUser?.followings?.includes(user?._id));
  }, [currentUser, user]);

  const handleFollowers = async () => {
    try {
      if (followed) {
        dispatch(unfollowUser(user._id, currentUser._id));
      } else {
        dispatch(followUser(user._id, currentUser._id));
      }
      setFollowed((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user?.username !== currentUser?.username && (
        <button className="rightbarFollowButton" onClick={handleFollowers}>
          {followed ? <Remove /> : <Add />}
          {followed ? "Unfollow" : "Follow"}
        </button>
      )}
      <h4 className="rightbarTitle">{user?.username} information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user?.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user?.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user?.relationship === 1
              ? "Single"
              : user?.relationship === 2
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">{user?.username} Followings</h4>
      <div className="rightbarFollowings">
        {friends.length
          ? friends?.map((friend) => (
              <Friend key={friend._id} friend={friend} />
            ))
          : "No Followings Yet"}
      </div>
    </>
  );
};

export default ProfileRightbar;
