import React, { useState } from "react";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNoti, setNoti] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const notiMessage = () => (
    <div className="alert alert-success mt-4" role="alert">
      Email sent to {email}. Click the link to complete your registration.
    </div>
  );

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoFocus
      />
      <input
        type="password"
        className="form-control mt-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button type="submit" className="btn btn-raised btn-primary mt-4">
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
