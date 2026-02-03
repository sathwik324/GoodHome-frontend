function Navbar() {
  return (
    <div className="navbar">
      <h2>GoodHome</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
