// src/hooks/useTheme.ts
import useThemeStore from "@/store/themeStore";

export default function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return { theme, toggleTheme, setTheme };
}
