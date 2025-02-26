import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        titlecolor: "var(--title-color)"
      },
      fontSize: {
        summary_card_p: 'calc(100% + 1.2vw)',
      },
      width: {
        container_width: '80vw',
      },
      height: {
        container_height: '90vh',
      },
      flex: {
        summary_data: '1 0 calc(25% - 10px)',
      },
      gridTemplateRows: {
        gridLayout: '0.75fr 5fr 2fr'
      },
      animation: {
        summary_card_anime: 'fade 2s linear',
      },

    },
  },
  plugins: [],
} satisfies Config;
