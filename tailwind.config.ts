
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 1rem))" },
        },
        "slide-right": {
          from: { transform: "translateX(calc(-50% - 1rem))" },
          to: { transform: "translateX(0)" },
        },
        "slide-left-fast": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 1rem))" },
        },
        "slide-right-fast": {
          from: { transform: "translateX(calc(-50% - 1rem))" },
          to: { transform: "translateX(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-66.666% - 1rem))" },
        },
        "slide-down": {
          from: { transform: "translateY(calc(-66.666% - 1rem))" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slider-left": "slide-left 30s linear infinite",
        "slider-right": "slide-right 30s linear infinite",
        "slider-left-fast": "slide-left-fast 20s linear infinite",
        "slider-right-fast": "slide-right-fast 20s linear infinite",
        "slider-up": "slide-up 25s linear infinite",
        "slider-down": "slide-down 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
