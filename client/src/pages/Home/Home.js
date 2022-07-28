import { Topbar, Sidebar, Feed, HomeRightbar } from "../../components";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <div className="rightbar">
          <div className="rightbarWrapper">
            <HomeRightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
