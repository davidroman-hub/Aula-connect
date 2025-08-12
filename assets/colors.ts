import { white } from "$std/fmt/colors.ts";
const theme = localStorage.getItem("theme") || "light";

export const palette = {
  primary: "#F43374", //<-- Primary color for the primary buttons -->
  hover: "#C1275A",
  active: "#8F1E45",

  backgroundSoft: "#F77DA9",
  backgroundSuperSoft: "#FCD5E3",
  white: "#ffff",
  darkThemeBackground: "#1D232A",
  bottomBackground: "bottom",
  linearGradient:
    "linear-gradient(90deg, rgba(244, 51, 116, 1) 0%, rgba(143, 30, 69, 1) 50%, rgba(237, 221, 83, 1) 100%)",

  linearGradient2:
    "linear-gradient(90deg,rgba(244, 51, 116, 1) 0%, rgba(143, 30, 69, 110) 160%,  rgba(237, 221, 83, 1) 100%)",
};

export const manageTheme = () => {
  if (theme === "dark") {
    return "bg-black-50";
  } else {
    return "bg-gray-50";
  }
};

export const manageTheme2 = () => {
  if (theme === "dark") {
    return "bg-[#1D232A]";
  } else {
    return "bg-gray-50";
  }
};

export const manageFontColor = () => {
  if (theme === "dark") {
    return "bg-black-50";
  } else {
    return "bg-gray-50";
  }
};

export const manageFontColorDash = () => {
  if (theme === "dark") {
    return "text-white";
  } else {
    return "text-gray-800";
  }
};
