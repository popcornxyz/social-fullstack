import { Home, Login, Profile, Register } from "./pages";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/actions/user.action";

function App() {
  const user = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(user?.uid));
  }, [user, dispatch]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
