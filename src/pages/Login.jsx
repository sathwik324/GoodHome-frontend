import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login: saveSession } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });

            // Save both token AND user object to AuthContext + localStorage
            saveSession(res.data.token, res.data.user);

            setMsg("Login successful");
            setTimeout(() => {
                navigate("/dashboard");
            }, 500);
        } catch (err) {
            setMsg(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <h2>GoodHome</h2>
                <p className="subtitle">Welcome Back</p>
                <p className="auth-link">
                    Don't have an account? <Link to="/">Register</Link>
                </p>

                <form onSubmit={login}>
                    <input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn-primary">Login</button>
                </form>

                {msg && <p className="msg-alert">{msg}</p>}
            </div>
        </div>
    );
}

export default Login;
