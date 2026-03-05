import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User, Mail, Lock, LogOut, Save } from "lucide-react";

function SettingsPage() {
    const { user, handleLogout } = useOutletContext();
    const [name, setName] = useState(user?.name || "");
    const [saved, setSaved] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwMsg, setPwMsg] = useState("");

    const handleSaveName = (e) => {
        e.preventDefault();
        // TODO: PATCH /api/auth/profile { name }
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPwMsg("Passwords do not match");
            return;
        }
        // TODO: PATCH /api/auth/password { currentPassword, newPassword }
        setPwMsg("Password changed (backend not yet implemented)");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPwMsg(""), 3000);
    };

    return (
        <div className="feature-page settings-page">
            {/* Profile Section */}
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
                            <input
                                id="settings-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                            />
                        </div>
                        <button className="btn-accent" type="submit">
                            <Save size={16} />
                            <span>{saved ? "Saved ✓" : "Save Changes"}</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Change Password Section */}
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
                        {pwMsg && <p className="settings-msg">{pwMsg}</p>}
                    </form>
                </div>
            </div>

            {/* Logout */}
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
