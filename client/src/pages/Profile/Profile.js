import { ProfileRightbar, Topbar, Sidebar, Feed } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";

const Profile = () => {
  const pub = process.env.REACT_APP_PUBLIC;

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.getUserByName(username);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? pub + user.coverPicture
                    : pub + "person/noCover.png"
                }
                alt={user?.username}
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? pub + user.profilePicture
                    : pub + "person/noAvatar.png"
                }
                alt={user?.username}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <div className="rightbar">
              <div className="rightbarWrapper">
                <ProfileRightbar user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
