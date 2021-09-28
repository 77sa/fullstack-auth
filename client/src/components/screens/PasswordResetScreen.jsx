import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import axios from "axios";

const PasswordResetScreen = ({ match }) => {
  const [passwords, setPasswords, handleChange] = useForm({
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    const { password, password2 } = passwords;

    if (password !== password2) {
      setPasswords({ password: "", password2: "" });
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = axios.put(
        `/api/auth/resetPassword/${match.params.resetToken}`,
        { password }
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div>
      <form onSubmit={submit}>
        <h3>Forgot password</h3>
        {error && <span>{error}</span>}
        {success && (
          <span>
            {success}
            <Link to="/login">Login</Link>
          </span>
        )}

        <div>
          <label htmlFor="password">New password: </label>
          <input
            type="password"
            required
            name="password"
            value={passwords.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm password: </label>
          <input
            type="password"
            required
            name="password2"
            value={passwords.password2}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default PasswordResetScreen;
