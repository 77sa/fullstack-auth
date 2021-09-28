import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterScreen = ({ history }) => {
  const [user, setUser, handleChange] = useForm({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  // Check if usr is already logged in and redirect:
  useEffect(() => {
    if (localStorage.getItem("authToken")) history.push("/");
  }, [history]);

  const submit = async (e) => {
    e.preventDefault();

    const { username, email, password, password2 } = user;

    if (password !== password2) {
      setUser({ ...user, password: "", password2: "" });
      setTimeout(() => setError(""), 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => setError(""), 5000);
    }

    setUser({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h3>Register</h3>
        {error && <span>{error}</span>}
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            required
            name="username"
            valeu={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            required
            name="email"
            valeu={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            required
            name="password"
            valeu={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm password: </label>
          <input
            type="password"
            required
            name="password2"
            valeu={user.password2}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
