import defineConfig from "$fresh/plugins/twind.ts";

export default defineConfig({
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "20%": { opacity: "1", transform: "translateY(0)" },
          "80%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-20px)" },
        },
      },
      animation: {
        fadeInOut: "fadeInOut 2s ease-in-out forwards",
      },
    },
  },
  selfURL: "",
});
