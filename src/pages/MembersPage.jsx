import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, UserPlus, Mail, X } from "lucide-react";

// TODO: Replace with GET /api/members when backend endpoint exists
const placeholderMembers = [
    { _id: "1", name: "Mom", email: "mom@family.com", role: "Admin", online: true },
    { _id: "2", name: "Dad", email: "dad@family.com", role: "Admin", online: true },
    { _id: "3", name: "Sarah", email: "sarah@family.com", role: "Member", online: false },
    { _id: "4", name: "Alex", email: "alex@family.com", role: "Member", online: true },
    { _id: "5", name: "Grandma", email: "grandma@family.com", role: "Member", online: false },
    { _id: "6", name: "Uncle Joe", email: "joe@family.com", role: "Member", online: false },
];

function MembersPage() {
    const { user } = useOutletContext();
    const [members] = useState(placeholderMembers);
    const [search, setSearch] = useState("");
    const [showInvite, setShowInvite] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");

    const filtered = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleInvite = (e) => {
        e.preventDefault();
        // TODO: POST /api/members/invite { name: inviteName, email: inviteEmail }
        alert(`Invite sent to ${inviteEmail} (backend not yet implemented)`);
        setShowInvite(false);
        setInviteName("");
        setInviteEmail("");
    };

    return (
        <div className="feature-page">
            {/* Header */}
            <div className="feature-header">
                <div className="search-bar">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="btn-accent" onClick={() => setShowInvite(true)}>
                    <UserPlus size={18} />
                    <span>Invite Member</span>
                </button>
            </div>

            {/* Members Grid */}
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
                            <span className={`role-badge ${member.role.toLowerCase()}`}>{member.role}</span>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className="empty-state">No members found matching "{search}"</p>
                )}
            </div>

            {/* Invite Modal */}
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
                            <input
                                placeholder="Name"
                                value={inviteName}
                                onChange={(e) => setInviteName(e.target.value)}
                                required
                            />
                            <input
                                placeholder="Email"
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                required
                            />
                            <button className="btn-primary" type="submit">Send Invite</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MembersPage;
