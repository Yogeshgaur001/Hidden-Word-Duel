// postcss.config.mjs

const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Use the @tailwindcss/postcss plugin
    'autoprefixer': {},         // Include autoprefixer
  },
};

export default config;