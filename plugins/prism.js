import Prism from "prismjs";
import "@static/prism/prism.css";
export default defineNuxtPlugin(() => {
  return {
    provide: {
      Prism,
    },
  };
});
