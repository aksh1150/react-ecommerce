import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

import { useSelector } from "react-redux";
const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [isNoti, setNoti] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]); // getting user from firebase it take some time. So we add here [user] instead empty [] so when user successfully recive from fire base we update and redirec to home page.

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    setNoti(true);
    window.localStorage.setItem("emailForRegistration", email);
    // setEmail("");
  };
  const notiMessage = () => (
    <div className="alert alert-success mt-4" role="alert">
      Email sent to {email}. Click the link to complete your registration.
    </div>
  );

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-raised btn-primary mt-4">
        Register
      </button>
      {isNoti ? notiMessage() : ""}
    </form>
  );

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};
export default Register;
