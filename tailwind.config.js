module.exports = {
  important: true,
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  purge: {
    enabled: false,
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      './src/**/*.js'
    ],
    defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#FF0090',
      secondary: '#6FDDEF',
      tertiary: '#0A1B33',
      white: '#FFFFFF',
      yellow: '#FFC549',
    },
    fill: {
      primary: '#FF0090',
      secondary: '#6FDDEF',
      tertiary: '#0A1B33',
      white: '#FFFFFF',
      yellow: '#FFC549',
    },
    screens: {
      'xs': '320px',
      'sm':	'640px',
      'md':	'768px',
      'lg':	'1024px',	
      'xl':	'1280px',
      '2xl': '1536px'
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      switzer_regular: ['Switzer Regular']
    },
  },
  plugins: [],
}
