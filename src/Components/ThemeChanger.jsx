import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeChanger() {
  const [theme, setTheme] = useState("light");

  // Initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute(
        "data-theme",
        savedTheme
      );
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const systemTheme = prefersDark
        ? "dark"
        : "light";

      setTheme(systemTheme);

      document.documentElement.setAttribute(
        "data-theme",
        systemTheme
      );
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme =
      theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        relative
        w-[78px]
        h-[42px]
        rounded-full
        border
        border-blue-100
        bg-blue-50
        backdrop-blur-md
        flex
        items-center
        px-1
        overflow-hidden
      "
    >

      {/* Sliding Circle */}
      <motion.div
        animate={{
          x: theme === "dark" ? 36 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="
          absolute
          w-[34px]
          h-[34px]
          rounded-full
          bg-[#1B3038]
          flex
          items-center
          justify-center
        "
      >
        {theme === "dark" ? (
          <Moon size={16} color="white" />
        ) : (
          <Sun size={16} color="white" />
        )}
      </motion.div>

      {/* Icons Row */}
      <div className="w-full flex justify-between px-2 z-10 pointer-events-none">
        <Sun
          size={15}
          className="text-black/50"
        />

        <Moon
          size={15}
          className="text-black/50"
        />
      </div>
    </button>
  );
}