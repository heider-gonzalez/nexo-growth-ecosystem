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
    }, 450);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer items-center rounded-full border border-slate-300/80 bg-slate-200/90 p-[2px] shadow-inner transition-colors duration-[420ms] [transition-timing-function:cubic-bezier(0.25,1,0.35,1)] hover:border-primary/50 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-slate-700/80 dark:bg-slate-800/90 select-none"
    >
      <span
        className={`relative inline-flex h-[24px] w-[24px] transform-gpu items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-[420ms] [transition-timing-function:cubic-bezier(0.25,1,0.35,1)] will-change-transform dark:bg-slate-900 dark:shadow-[0_1px_3px_rgba(0,0,0,0.5)] ${
          isDark ? "translate-x-[24px]" : "translate-x-0"
        }`}
      >
        <Sun
          className={`absolute h-3.5 w-3.5 text-slate-700 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.25,1,0.35,1)] ${
            isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <Moon
          className={`absolute h-3.5 w-3.5 text-cyan-400 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.25,1,0.35,1)] ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
