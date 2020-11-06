require('dotenv').config();
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
  },
  env: {
    API_URL: process.env.API_URL,
  },
});
