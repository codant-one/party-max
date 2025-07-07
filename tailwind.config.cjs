module.exports = {
  important: true,
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#FF0090',
      secondary: '#6FDDEF',
      tertiary: '#0A1B33',
      white: '#FFFFFF',
      yellow: '#FFC549',
      cyan: '#F3FCFE',
      gray: '#999999',
      green: '#E2F8FC',
      lightCyan: '#D9EEF2',
      cancel: '#EA3829',
      info: '#EF9C1D',
      positive: '#008F5D'
    },
    fill: {
      primary: '#FF0090',
      secondary: '#6FDDEF',
      tertiary: '#0A1B33',
      white: '#FFFFFF',
      yellow: '#FFC549',
      cyan: '#F3FCFE',
      gray: '#999999',
      green: '#E2F8FC',
      lightCyan: '#D9EEF2'
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
