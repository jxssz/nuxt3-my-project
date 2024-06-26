/** @type {import('tailwindcss').Config} */

import {addDynamicIconSelectors} from '@iconify/tailwind';
import colors from "tailwindcss/colors";

module.exports = {
  important: true,
  plugins: [addDynamicIconSelectors()],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      ...colors,
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    corePlugins: {
      // 确保 textOpacity 被启用
      textOpacity: true,
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontSize: {
        base: ["12px", "14px"],
      },
    }
  },
};
