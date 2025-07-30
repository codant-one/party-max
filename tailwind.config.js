/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF0090',
        secondary: '#6FDDEF',
        tertiary: '#0A1B33',
        white: '#FFFFFF',
        yellow: '#FFC549',
        yellow_happiness_100: '#FFEFC6',
        cyan: '#F3FCFE',
        gray: '#999999',
        green: '#E2F8FC',
        light_cyan: '#09EFE2',
        light_cyan_2: '#F3FCFE',
        cancel: '#EA3829',
        info: '#EF9C1D',
        positive: '#008F5D',
        grey_2: '#E1E1E1',
        magenta_100: '#FFE3F7'
      },
      fill: {
        primary: '#FF0090',
        secondary: '#6F0DFF',
        tertiary: '#0A81B3',
        white: '#FFFFFF',
        yellow: '#FFC549',
        cyan: '#3F9CFE',
        gray: '#999999',
        green: '#2E8FBC',
        light_cyan: '#09EFE2',
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: [
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
        switzer_regular: ['Switzer-Regular'],
      },
    },
  },
  plugins: [],
}