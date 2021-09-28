import axios from "axios";
import React, { useState } from "react";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/forgotPassword", { email });

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);

      setEmail("");

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h3>Forgot password</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}

        <div>
          <p>Enter the email address you registered your account with</p>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Send email</button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
