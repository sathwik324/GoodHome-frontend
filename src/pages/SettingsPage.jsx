import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/axiosInstance";
import { User, Mail, Lock, LogOut, Save } from "lucide-react";

function SettingsPage() {
    const { user, handleLogout } = useOutletContext();
    const [name, setName] = useState(user?.name || "");
    const [saved, setSaved] = useState(false);
    const [nameError, setNameError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwMsg, setPwMsg] = useState("");
    const [pwError, setPwError] = useState(false);

    const handleSaveName = (e) => {
        e.preventDefault();
        setNameError("");
        api
            .patch(`/auth/profile`, { name })
            .then(() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            })
            .catch((err) => {
                setNameError(err.response?.data?.message || "Failed to update name");
            });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPwMsg("");
        setPwError(false);
        if (newPassword !== confirmPassword) {
            setPwMsg("Passwords do not match");
            setPwError(true);
            return;
        }
        api
            .patch(`/auth/password`, { currentPassword, newPassword })
            .then(() => {
                setPwMsg("Password updated successfully!");
                setPwError(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => setPwMsg(""), 3000);
            })
            .catch((err) => {
                setPwMsg(err.response?.data?.message || "Failed to update password");
                setPwError(true);
            });
    };

    return (
        <div className="feature-page settings-page">
            <div className="settings-section">
                <h3><User size={20} /> Profile Information</h3>
                <div className="settings-card">
                    <div className="settings-field">
                        <label>Email</label>
                        <div className="settings-static">
                            <Mail size={16} />
                            <span>{user?.email || "—"}</span>
                        </div>
                    </div>
                    <form onSubmit={handleSaveName}>
                        <div className="settings-field">
                            <label htmlFor="settings-name">Display Name</label>
                            <input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                        </div>
                        <button className="btn-accent" type="submit">
                            <Save size={16} />
                            <span>{saved ? "Saved ✓" : "Save Changes"}</span>
                        </button>
                        {nameError && <p style={{ color: "#F87171", fontSize: "0.85rem", margin: 0 }}>{nameError}</p>}
                    </form>
                </div>
            </div>

            <div className="settings-section">
                <h3><Lock size={20} /> Change Password</h3>
                <div className="settings-card">
                    <form onSubmit={handleChangePassword}>
                        <div className="settings-field">
                            <label>Current Password</label>
                            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" required />
                        </div>
                        <div className="settings-field">
                            <label>New Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" required />
                        </div>
                        <div className="settings-field">
                            <label>Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
                        </div>
                        <button className="btn-accent" type="submit">
                            <Lock size={16} />
                            <span>Update Password</span>
                        </button>
                        {pwMsg && <p className="settings-msg" style={pwError ? { color: "#F87171" } : {}}>{pwMsg}</p>}
                    </form>
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-card">
                    <button className="btn-danger" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
