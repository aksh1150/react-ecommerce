import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [isNoti, setNoti] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setNoti(true);

    if (!email || !password) {
      setErr("Email or paswword cannot be empty!");
      setNoti(true);
      return;
    }
    if (password.length < 6) {
      setErr("Password must be 6 characters long.");
      setNoti(true);
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        history.push("/");
      }

      // console.log("RESUKT", result);
    } catch (error) {
      setErr(error.message);
      // console.log(error.message);
      setNoti(true);
    }
  };
  const notiMessage = () => (
    <div className="alert alert-danger mt-4 p-2" role="alert">
      {err}
    </div>
  );

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit} className="mt-4">
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control mt-4 p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        autoFocus
      />
      <button type="submit" className="btn btn-raised btn-primary mt-4">
        Complete Registration
      </button>
      {isNoti ? notiMessage() : ""}
    </form>
  );

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
