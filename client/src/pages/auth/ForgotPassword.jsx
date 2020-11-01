import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNoti, setNoti] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("alert-warning");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]); // getting user from firebase it take some time. So we add here [user] instead empty [] so when user successfully recive from fire base we update and redirec to home page.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        setNoti(true);
        setAlertType("alert-success");
        setMsg("Check your email for password reset link");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setNoti(true);
        setMsg(error.message);
      });
  };

  const notiMessage = () => (
    <div className={`alert mt-4 ${alertType}`} role="alert">
      {msg}
    </div>
  );

  return (
    <div className="container col-md-6 offset-md-3 p-4">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit} className="mt-5">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoFocus
        />
        <br />
        <button className="btn btn-raised btn-primary" disabled={!email}>
          Submit
        </button>
        {isNoti ? notiMessage() : ""}
      </form>
    </div>
  );
};

export default ForgotPassword;
