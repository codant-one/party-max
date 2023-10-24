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
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
    },
  },
  plugins: [],
}
