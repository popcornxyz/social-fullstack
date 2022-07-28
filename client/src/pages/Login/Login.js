import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HourglassTop } from "@mui/icons-material";
import { signIn } from "../../firebase";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsFetching(true);

    try {
      await signIn(email.current.value, password.current.value);
    } catch (error) {
      console.log(error);
    }

    setIsFetching(false);
  };

  const handleNavigate = (e) => {
    e.preventDefault();

    navigate("/register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">
            ReactJS, Redux, NodeJS, MongoDB, Firebase
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <HourglassTop color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handleNavigate}>
              {isFetching ? (
                <HourglassTop color="white" size="20px" />
              ) : (
                "Create New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
