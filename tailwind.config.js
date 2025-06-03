/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
     // backgroundImage: theme => ({
     //   'gradient-to-r': `linear-gradient(to right, ${theme('colors.blue.400')}, ${theme('colors.cyan.400')}, ${theme('colors.teal.400')})`,
      //}),
    },
  },
  plugins: [],
};
