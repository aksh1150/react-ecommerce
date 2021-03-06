import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOutlined, LoginOutlined } from "@ant-design/icons";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNoti, setNoti] = useState(false);
  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]); // getting user from firebase it take some time. So we add here [user] instead empty [] so when user successfully recive from fire base we update and redirec to home page.

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

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
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
      })
      .catch((err) => {
        console.log(err);
        setNoti(true);
        setMsg(err.message);
      });
  };

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
        className="btn btn-raised btn-primary mt-4 mb-4"
        disabled={!email || password.length < 6}
      >
        {<LoginOutlined />} Login
      </button>
      <button
        type="submit"
        onClick={googleLogin}
        className="btn btn-raised btn-warning mt-4 mb-4 ml-2"
      >
        {<GoogleOutlined />} Login with Google
      </button>
      {isNoti ? notiMessage() : ""}
    </form>
  );

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Link to="/forgot/password" className="text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
