import React from "react";
import useTheme from "@/hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 m-2 rounded-md border border-black bg-colors-customGreen text-white hover:bg-colors-customPink transition-colors"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
};

export default ThemeToggle;
