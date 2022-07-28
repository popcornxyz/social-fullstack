import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../firebase";

const Topbar = () => {
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const pub = process.env.REACT_APP_PUBLIC;

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social App</span>
        </NavLink>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search..." className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Watch</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">6</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">9</span>
          </div>
        </div>
        {user && (
          <NavLink to={`/profile/${user.username}`}>
            <img
              src={
                user?.profilePicture
                  ? pub + user.profilePicture
                  : pub + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </NavLink>
        )}

        <button onClick={handleLogOut} className="topbar__logout">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Topbar;
