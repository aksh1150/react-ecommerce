import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return <div className="container col-md-6 offset-md-2 p-5">form</div>;
};

export default ForgotPassword;
