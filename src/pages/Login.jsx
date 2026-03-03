import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/theme.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://goodhome-backend.onrender.com/api/auth/login",
                { email, password }
            );
            setMsg("Login successful");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2>GoodHome</h2>
                <p style={{ opacity: 0.7 }}>Login</p>
                <p>Don't have an account? <Link to="/">Register</Link></p>
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
    },
};

export default Login;
