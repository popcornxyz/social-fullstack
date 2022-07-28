import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HourglassTop } from "@mui/icons-material";
import { signUp } from "../../firebase";

const Register = () => {
  const [username, setUsername] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Email or Password incorrect");
    } else {
      setIsFetching(true);

      try {
        await signUp(email.current.value, password.current.value, username);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }

      setIsFetching(false);
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();

    navigate("/login");
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
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              required
              ref={confirmPassword}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <HourglassTop color="white" size="20px" />
              ) : (
                "Create New Account"
              )}
            </button>

            <button className="loginRegisterButton" onClick={handleNavigate}>
              {isFetching ? (
                <HourglassTop color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
