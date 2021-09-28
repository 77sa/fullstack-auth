import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const [user, setUser, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Check if usr is already logged in and redirect:
  useEffect(() => {
    if (localStorage.getItem("authToken")) history.push("/");
  }, [history]);

  const submit = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => setError(""), 5000);
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h3>Login</h3>
        {error && <span>{error}</span>}
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
          <label htmlFor="password">
            Password: <Link to="/forgotpassword">Forgot password?</Link>
          </label>
          <input
            type="password"
            required
            name="password"
            valeu={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
