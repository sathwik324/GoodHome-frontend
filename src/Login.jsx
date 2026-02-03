import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Theme.css";
import { useAuth } from "./context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { login: authLogin } = useAuth();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://goodhome-backend.onrender.com/api/auth/login",
        { email, password }
      );

      authLogin(res.data.token);

      setMsg("Login successful");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    setMsg(err.response?.data?.message || "Login failed");
  }
};



  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>GoodHome</h2>
        <p style={{ opacity: 0.7 }}>Welcome back</p>

        <form onSubmit={login}>
          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.btn}>Login</button>
        </form>

        <p>{msg}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "var(--card)",
    padding: 40,
    borderRadius: 20,
    width: 320,
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
  },

  btn: {
    width: "100%",
    marginTop: 20,
    padding: 12,
    border: "none",
    borderRadius: 10,
    background: "var(--primary)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
