import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { Plus, LogIn, Users, X } from "lucide-react";
import TopBar from "../components/dashboard/TopBar";
import { useAuth } from "../context/AuthContext";

function GroupsPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreate, setShowCreate] = useState(false);
    const [createForm, setCreateForm] = useState({ name: "", description: "" });

    const [showJoin, setShowJoin] = useState(false);
    const [inviteCode, setInviteCode] = useState("");
    const [modalError, setModalError] = useState("");

    const fetchGroups = () => {
        setLoading(true);
        api
            .get(`/groups/my`)
            .then((res) => {
                setGroups(res.data);
                setError("");
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    logout();
                    navigate("/login");
                } else {
                    setError("Failed to load your groups.");
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchGroups(); }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        setModalError("");
        api
            .post(`/groups/create`, createForm)
            .then(() => {
                setShowCreate(false);
                setCreateForm({ name: "", description: "" });
                fetchGroups();
            })
            .catch((err) => {
                console.error("Create Group Error:", err);
                setModalError(err.response?.data?.message || "Failed to create group");
            });
    };

    const handleJoin = (e) => {
        e.preventDefault();
        setModalError("");
        api
            .post(`/groups/join`, { inviteCode })
            .then((res) => {
                setShowJoin(false);
                setInviteCode("");
                const newlyJoinedId = res.data?.group?._id || res.data?._id;
                if (newlyJoinedId) {
                    navigate(`/groups/${newlyJoinedId}/channels`);
                } else {
                    fetchGroups();
                }
            })
            .catch((err) => {
                console.error("Join Group Error:", err);
                setModalError(err.response?.data?.message || "Invalid invite code");
            });
    };

    return (
        <div className="dashboard-layout">
            <div className="dashboard-main" style={{ marginLeft: 0 }}>
                <TopBar pageTitle="My Groups" hideHamburger={true} />

                <div className="dashboard-content" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="feature-header">
                        <h3>Your Groups</h3>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="btn-primary" onClick={() => { setShowJoin(true); setModalError(""); }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <LogIn size={18} /> Join Group
                            </button>
                            <button className="btn-accent" onClick={() => { setShowCreate(true); setModalError(""); }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <Plus size={18} /> Create Group
                            </button>
                        </div>
                    </div>

                    {loading && <p style={{ color: "var(--color-text-secondary)" }}>Loading your groups...</p>}
                    {error && <p style={{ color: "#F87171" }}>{error}</p>}

                    {!loading && groups.length === 0 && !error && (
                        <div className="empty-state" style={{ padding: "60px 20px", background: "var(--color-card)", borderRadius: "var(--radius-lg)", border: `1px solid var(--color-border)` }}>
                            <Users size={48} color="var(--color-text-secondary)" style={{ marginBottom: 16 }} />
                            <h3 style={{ margin: "0 0 8px 0", color: "var(--color-text-primary)" }}>You haven't joined any groups yet</h3>
                            <p style={{ margin: "0 0 24px 0" }}>Create a new group for your family or join an existing one using an invite code.</p>
                            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                                <button className="btn-accent" onClick={() => setShowCreate(true)}>Create Group</button>
                                <button className="btn-primary" onClick={() => setShowJoin(true)}>Join Group</button>
                            </div>
                        </div>
                    )}

                    {!loading && groups.length > 0 && (
                        <div className="members-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                            {groups.map((group) => (
                                <Link to={`/groups/${group._id}/channels`} key={group._id} style={{ textDecoration: "none" }}>
                                    <div className="member-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                                            <div className="member-avatar">{group.name.charAt(0).toUpperCase()}</div>
                                            <div>
                                                <h4 style={{ margin: 0, color: "var(--color-text-primary)", fontSize: "1.1rem" }}>{group.name}</h4>
                                                <p style={{ margin: "4px 0 0", color: "var(--color-text-secondary)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                                                    <Users size={14} /> {group.memberCount || group.members?.length || 1} members
                                                </p>
                                            </div>
                                        </div>
                                        {group.description && <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>{group.description}</p>}
                                        <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--color-border)", width: "100%", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                                            Owner: {group.owner?.name || group.ownerName || "Unknown"}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create New Group</h3>
                            <button className="modal-close" onClick={() => setShowCreate(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleCreate}>
                            <input placeholder="Group Name" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} required />
                            <textarea placeholder="Description (optional)" value={createForm.description} onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })} rows={3} />
                            <button className="btn-accent" type="submit">Create Group</button>
                            {modalError && <p className="settings-msg" style={{ color: "#F87171" }}>{modalError}</p>}
                        </form>
                    </div>
                </div>
            )}

            {/* Join Modal */}
            {showJoin && (
                <div className="modal-overlay" onClick={() => setShowJoin(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Join a Group</h3>
                            <button className="modal-close" onClick={() => setShowJoin(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleJoin}>
                            <input placeholder="Enter Invite Code" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} required />
                            <button className="btn-primary" type="submit">Join Group</button>
                            {modalError && <p className="settings-msg" style={{ color: "#F87171" }}>{modalError}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupsPage;
