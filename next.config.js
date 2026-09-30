const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': root,
    };
    return config;
  },
};
