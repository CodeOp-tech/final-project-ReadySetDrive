import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.loginCb(username, password);
  }
  // changed from /auth/register

  const gotoRegisterPage = () => navigate("/register");

  return (
    <div className="LoginView row">
      <div className="col-4 offset-4">
        <h2>Login</h2>

        {props.loginError && (
          <div className="alert alert-danger">{props.loginError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Username
              <input
                type="text"
                name="usernameInput"
                required
                className="form-control"
                value={username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Password
              <input
                type="password"
                name="passwordInput"
                required
                className="form-control"
                value={password}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            SIGN IN
          </button>
          <p>
            Don't have an account?{" "}
            <span class="text-success" onClick={gotoRegisterPage}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
