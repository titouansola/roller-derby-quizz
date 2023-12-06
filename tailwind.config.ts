import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'primary-foreground': '#ffffff',
        secondary: '#eeeeee',
        'secondary-foreground': '#000000',
        success: '#009900',
        'success-foreground': '#ffffff',
        destructive: '#ff0000',
        'destructive-foreground': '#ffffff',
        accent: '#eeeeee',
        'accent-foreground': '#000000',
        ring: '#000000',
      },
    },
  },
  plugins: [],
};
export default config;
