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
    document.documentElement.classList.add("theme-transitioning");
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 500);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-450 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_-3px_rgba(0,194,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer overflow-hidden"
    >
      <Sun
        className={`h-4 w-4 transition-all duration-450 ease-in-out transform ${
          isDark
            ? "rotate-0 scale-100 opacity-100 text-amber-400"
            : "-rotate-180 scale-0 opacity-0 absolute text-amber-400"
        }`}
      />
      <Moon
        className={`h-4 w-4 transition-all duration-450 ease-in-out transform ${
          isDark
            ? "rotate-180 scale-0 opacity-0 absolute text-cyan-400"
            : "rotate-0 scale-100 opacity-100 text-slate-700 dark:text-slate-200"
        }`}
      />
    </button>
  );
}
