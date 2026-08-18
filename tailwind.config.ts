import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sapphire: { DEFAULT: "#12395B", dark: "#0B263D" },
        champagne: { DEFAULT: "#C8A96B", light: "#F2E9D7" },
        ink: "#17212B", muted: "#5D6874", surface: "#F7F9FC", border: "#DCE3EA"
      },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] },
      boxShadow: { soft: "0 20px 60px rgba(18, 57, 91, 0.10)" }
    }
  },
  plugins: []
};
export default config;
