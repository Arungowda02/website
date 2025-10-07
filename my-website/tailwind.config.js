export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "zoom-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" }, // zoom in slightly
        },
      },
      animation: {
        "zoom-pulse": "zoom-pulse 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
