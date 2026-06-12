import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register/", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      alert("Registered successfully");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <br />

        <input name="email" placeholder="Email" onChange={handleChange} required />
        <br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;