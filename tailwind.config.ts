import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#FDFDF9',
        foreground: '#473B1F',
        //
        primary: '#FFE770',
        'primary-foreground': '#473B1F',
        //
        secondary: '#AB6400',
        //
        success: '#30A46C',
        'success-foreground': '#F4FBF6',
        //
        destructive: '#DC3E42',
        'destructive-foreground': '#FFF7F7',
        //
        accent: '#FFEE9C',
        'accent-foreground': '#473B1F',
        //
        border: '#DAD9D6',
        //
        card: '#FCFDFC',
        'card-foreground': '#473B1F',
        //
        input: '#DAD9D6',
        ring: '#D5AE39',
      },
    },
  },
  plugins: [],
};
export default config;
