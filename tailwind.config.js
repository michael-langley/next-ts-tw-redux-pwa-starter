module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    mode: 'all',
    content: ['./pages/**/*.tsx', './components/**/*.tsx', './pages/**/*.js', './components/**/*.js'],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\i-${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    },
  ],
  variants: ['important', 'responsive'],
};
