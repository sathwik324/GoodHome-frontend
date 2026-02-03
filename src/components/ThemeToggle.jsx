function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 14px",
        borderRadius: "10px",
        border: "none",
        background: "var(--primary)",
        color: "white",
        cursor: "pointer",
      }}
    >
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
