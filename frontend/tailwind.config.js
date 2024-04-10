module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'euclid': ['Euclid Circular A Regular', 'sans-serif'],
        'euclid-italic': ['Euclid Circular A Italic', 'sans-serif'],
        'euclid-light': ['Euclid Circular A Light', 'sans-serif'],
        'euclid-light-italic': ['Euclid Circular A Light Italic', 'sans-serif'],
        'euclid-medium': ['Euclid Circular A Medium', 'sans-serif'],
        'euclid-medium-italic': ['Euclid Circular A Medium Italic', 'sans-serif'],
        'euclid-semibold': ['Euclid Circular A SemiBold', 'sans-serif'],
        'euclid-semibold-italic': ['Euclid Circular A SemiBold Italic', 'sans-serif'],
        'euclid-bold': ['Euclid Circular A Bold', 'sans-serif'],
        'euclid-bold-italic': ['Euclid Circular A Bold Italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
