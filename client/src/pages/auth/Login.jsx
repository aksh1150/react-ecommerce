import React, { useState } from "react";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNoti, setNoti] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(
      `Email sent to ${email}. Click the link to complete your registration.`
    );
  };

  const notiMessage = () => (
    <div className="alert alert-success mt-4" role="alert">
      {msg}
    </div>
  );

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-raised btn-outline-primary mt-4 mb-4"
        disabled={!email || password.length < 6}
      >
        Login
      </button>
      {isNoti ? notiMessage() : ""}
    </form>
  );

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <h4>Login</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};
export default Login;
