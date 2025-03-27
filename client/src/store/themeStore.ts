// src/store/themeStore.ts
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// leta efter sparat tema
let initialTheme: Theme;

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light" || storedTheme === "dark") {
  initialTheme = storedTheme;
} else {
  // Använd systemets tema om inget finns sparat
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  initialTheme = prefersDark ? "dark" : "light";
  localStorage.setItem("theme", initialTheme);
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme: Theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
