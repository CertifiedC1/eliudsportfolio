import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glow: "hsl(var(--glow))",
        mirror: "hsl(var(--mirror))",
        dream: "hsl(var(--dream))",
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "particle-float": {
          "0%, 100%": {
            opacity: "0.5",
            transform: "translate(-50%, -50%) translateY(0px) scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "translate(-50%, -50%) translateY(-15px) scale(1.3)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "zoom-portal": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 40px hsl(35 100% 50% / 0.5), 0 0 80px hsl(35 100% 50% / 0.3), 0 0 120px hsl(35 100% 50% / 0.15)",
          },
          "50%": {
            boxShadow: "0 0 60px hsl(35 100% 50% / 0.7), 0 0 120px hsl(35 100% 50% / 0.5), 0 0 180px hsl(35 100% 50% / 0.25)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-card": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-8px) rotate(1deg)" },
          "50%": { transform: "translateY(-12px) rotate(0deg)" },
          "75%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        "letter-reveal": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "orbit-skill": {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.3) translateY(20px)" },
          "60%": { opacity: "1", transform: "scale(1.1) translateY(-5px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "fade-out": "fade-out 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "zoom-portal": "zoom-portal 0.8s ease-in forwards",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-card": "float-card 3s ease-in-out infinite",
        "letter-reveal": "letter-reveal 0.5s ease-out forwards",
        "spin-slow": "spin-slow 8s linear infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "particle-float": "particle-float 2.5s ease-in-out infinite",
        "orbit-skill": "orbit-skill 3s linear forwards",
        "pop-in": "pop-in 0.5s ease-out forwards",
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
