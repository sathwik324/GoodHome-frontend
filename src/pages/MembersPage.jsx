import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Search, UserPlus, Mail, X } from "lucide-react";

const API = "https://goodhome-backend.onrender.com/api";

function MembersPage() {
    const { user } = useOutletContext();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showInvite, setShowInvite] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteMsg, setInviteMsg] = useState("");

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchMembers = () => {
        setLoading(true);
        axios
            .get(`${API}/members`, { headers })
            .then((res) => { setMembers(res.data); setError(""); })
            .catch(() => setError("Failed to load members"))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchMembers(); }, []);

    const filtered = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleInvite = (e) => {
        e.preventDefault();
        setInviteMsg("");
        axios
            .post(`${API}/members/invite`, { name: inviteName, email: inviteEmail }, { headers })
            .then(() => {
                setInviteMsg("Invite sent!");
                setInviteName("");
                setInviteEmail("");
                fetchMembers();
                setTimeout(() => { setShowInvite(false); setInviteMsg(""); }, 1500);
            })
            .catch((err) => {
                setInviteMsg(err.response?.data?.message || "Failed to send invite");
            });
    };

    return (
        <div className="feature-page">
            <div className="feature-header">
                <div className="search-bar">
                    <Search size={18} />
                    <input type="text" placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button className="btn-accent" onClick={() => setShowInvite(true)}>
                    <UserPlus size={18} />
                    <span>Invite Member</span>
                </button>
            </div>

            {loading && <p style={{ color: "var(--color-text-secondary)" }}>Loading members...</p>}
            {error && <p style={{ color: "#F87171" }}>{error}</p>}

            <div className="members-grid">
                {filtered.map((member) => (
                    <div className="member-card" key={member._id}>
                        <div className="member-avatar">
                            {member.name.charAt(0).toUpperCase()}
                            <span className={`status-dot ${member.online ? "online" : "offline"}`} />
                        </div>
                        <div className="member-info">
                            <h4>{member.name}</h4>
                            <p><Mail size={14} /> {member.email}</p>
                            <span className={`role-badge ${(member.role || "member").toLowerCase()}`}>{member.role || "Member"}</span>
                        </div>
                    </div>
                ))}
                {!loading && filtered.length === 0 && (
                    <p className="empty-state">No members found{search ? ` matching "${search}"` : ""}</p>
                )}
            </div>

            {showInvite && (
                <div className="modal-overlay" onClick={() => setShowInvite(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Invite Family Member</h3>
                            <button className="modal-close" onClick={() => setShowInvite(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleInvite}>
                            <input placeholder="Name" value={inviteName} onChange={(e) => setInviteName(e.target.value)} required />
                            <input placeholder="Email" type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
                            <button className="btn-primary" type="submit">Send Invite</button>
                            {inviteMsg && <p className="settings-msg">{inviteMsg}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MembersPage;
