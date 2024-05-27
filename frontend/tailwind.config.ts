import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'mn': '900px',
      // => @media (min-width: 900px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        "primary-background":'#212434',
        "primary": '#212434',
        "primary-blend": '#916EA5',
        "primary-button": '#3772FF',
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        spacegrotesk: ["Space Grotesk", "sans-serif"],
        Montserrat: ["Montserrat"],
        Orbitron: ["Orbitron"],
        irish: ["Irish Grover"]

      },

      
    },
  },
  plugins: [],
}
export default config
