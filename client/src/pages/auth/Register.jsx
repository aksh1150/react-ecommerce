import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    //
  };
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
