import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sapphire: { DEFAULT: "var(--color-brand-primary)", dark: "var(--color-brand-primary-strong)" },
        champagne: { DEFAULT: "var(--color-brand-accent)", light: "var(--color-brand-accent-soft)" },
        ink: "var(--color-text-primary)", muted: "var(--color-text-secondary)", surface: "var(--color-bg-subtle)", border: "var(--color-border)",
        success: "var(--color-success)", warning: "var(--color-warning)", danger: "var(--color-danger)", info: "var(--color-info)"
      },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] },
      boxShadow: { soft: "var(--shadow-soft)" },
      transitionTimingFunction: { standard: "var(--motion-standard)" },
      transitionDuration: { fast: "120ms", base: "180ms", slow: "320ms" }
    }
  },
  plugins: []
};
export default config;
