import useTheme from "@/hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 m-2 rounded-2xl border-4 border-border bg-button text-text hover:bg-hoveredButton active:activeButton"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
};

export default ThemeToggle;
