import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login/", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert("Invalid login");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;