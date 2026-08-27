import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

function getPreferredTheme(): ThemeMode {
  try {
    const storedTheme = window.localStorage.getItem("nexo-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Ignore storage access errors.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
    document.documentElement.classList.toggle("dark", preferredTheme === "dark");
    document.documentElement.style.colorScheme = preferredTheme;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem("nexo-theme", theme);
    } catch {
      // Ignore storage access errors.
    }
  }, [mounted, theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
