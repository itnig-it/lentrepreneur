module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'light': '#f3d18c',
          'DEFAULT': '#a24825',
          'dark': '#40320a',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
} 