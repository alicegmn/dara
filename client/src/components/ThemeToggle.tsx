import useTheme from "@/hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 m-2 rounded-2xl border-4 border-border bg-button text-text hover:bg-hoveredButton active:activeButton"
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
};

export default ThemeToggle;
