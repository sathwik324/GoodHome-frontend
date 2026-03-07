import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/axiosInstance";
import { Search, UserPlus, Mail, X } from "lucide-react";

function MembersPage() {
    const { user, groupId } = useOutletContext();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteMsg, setInviteMsg] = useState("");

    const fetchMembers = () => {
        if (!groupId) return;
        setLoading(true);
        api
            .get(`/groups/${groupId}/members`)
            .then((res) => { setMembers(res.data); setError(""); })
            .catch(() => setError("Failed to load members for this group."))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchMembers(); }, [groupId]);

    const filtered = members.filter((m) =>
        (m.name || m.user?.name || "").toLowerCase().includes(search.toLowerCase())
    );

    const handleInvite = (e) => {
        e.preventDefault();
        setInviteMsg("");
        api
            .post(`/groups/${groupId}/invite`, { email: inviteEmail })
            .then(() => {
                setInviteMsg("Invite sent!");
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

            {loading && <p style={{ color: "var(--color-text-secondary)" }}>Loading group members...</p>}
            {error && <p style={{ color: "#F87171" }}>{error}</p>}

            <div className="members-grid">
                {filtered.map((memberObj) => {
                    const m = memberObj.user || memberObj;
                    const role = memberObj.role || m.role || "Member";

                    return (
                        <div className="member-card" key={m._id || Math.random()}>
                            <div className="member-avatar">
                                {(m.name || "?").charAt(0).toUpperCase()}
                                <span className={`status-dot ${m.online ? "online" : "offline"}`} />
                            </div>
                            <div className="member-info">
                                <h4>{m.name || "Unknown"}</h4>
                                <p><Mail size={14} /> {m.email || ""}</p>
                                <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>
                            </div>
                        </div>
                    );
                })}
                {!loading && filtered.length === 0 && (
                    <p className="empty-state">No members found{search ? ` matching "${search}"` : ""}</p>
                )}
            </div>

            {showInvite && (
                <div className="modal-overlay" onClick={() => setShowInvite(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Invite to Group</h3>
                            <button className="modal-close" onClick={() => setShowInvite(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleInvite}>
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
