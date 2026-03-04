import "../styles/dashboard.css";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: "var(--radius-sm)",
            background: "var(--gradient-primary)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <h2>GoodHome</h2>
      </div>

      <div className="navbar-actions">
        <button
          className="btn-logout"
          onClick={onLogout}
          aria-label="Logout"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
