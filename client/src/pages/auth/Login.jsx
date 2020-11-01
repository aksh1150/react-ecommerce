import React, { useState } from "react";
import { auth } from "../../firebase";

import { useDispatch } from "react-redux";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNoti, setNoti] = useState(false);
  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setMsg(
    //   `Email sent to ${email}. Click the link to complete your registration.`
    // );
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      setNoti(true);
      setMsg(error.message);
      setLoading(false);
    }
  };

  const notiMessage = () => (
    <div className="alert alert-warning mt-4" role="alert">
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
