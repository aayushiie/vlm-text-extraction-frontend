import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header({ heading }) {

    // RANDOM TILT VALUES
    const tilts = [
        -12,
        8,
        -6,
        14,
        -10,
        5,
        -16,
        10,
        -7,
        12,
    ];

    // RANDOM COLORS
    const colors = [
        "#ff6b6b",
        "#ffd93d",
        "#6bcBef",
        "#c77dff",
        "#95e06c",
        "#ff9f68",
    ];

     const [isDark, setIsDark] = useState(false)

  useEffect(() => {

    const checkTheme = () => {

      const theme =
        document.documentElement.getAttribute(
          "data-theme"
        )

      setIsDark(theme === "dark")
    }

    checkTheme()

    const observer = new MutationObserver(
      checkTheme
    )

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["data-theme"],
      }
    )

    return () => observer.disconnect()

  }, [])

    return (
        // <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
            <motion.h1
                animate="visible"
                className="
        text-[8vw] sm:text-[7vw] md:text-[6vw]
          leading-none
          font-black
          uppercase
          tracking-tight
          flex
          flex-wrap
          justify-center
          max-w-full
        "
            >
                {heading.split("").map((char, index) => {
                    const randomTilt =
                        tilts[index % tilts.length];

                    const randomColor =
                        colors[index % colors.length];

                    return (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: {
                                    y: 120,
                                    opacity: 0,
                                },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                },
                            }}
                            transition={{
                                duration: 0.12,
                                ease: "easeOut",
                            }}

                            // HOVER ANIMATION
                            whileHover={{
                                rotate: randomTilt,
                                scale: 1.15,
                                color: randomColor,
                                y: -8,
                            }}

                            // SMOOTH RESET
                            animate={{
                                rotate: 0,
                                scale: 1,
                                color: `${isDark ? "#F9FAFB" : "#252525"}`,
                                y: 0,
                            }}

                            className="
                inline-block
                text-`${isDark ? #F9FAFB : #252525}`
                cursor-default
                will-change-transform
                transition-all
                mt-8
              "
                        >
                            {char === " "
                                ? "\u00A0"
                                : char}
                        </motion.span>
                    );
                })}
            </motion.h1>
        </div>
    );
}