import babel from '@rollup/plugin-babel';
import html from 'rollup-plugin-html';

export default {
  input: 'src/index.js', // Adjust input as required by your project structure
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'public', // Output directory for bundled files
    sourcemap: true, // Enable source maps for easier debugging
  },
  preserveEntrySignatures: false, // Recommended for SPA apps to flatten modules

  plugins: [
    // Include HTML files in the build process
    html({
      include: '**/*.html', // Match HTML files in the project
    }),

    // Minify and compile JS using Babel
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Ignore dependencies
      presets: ['@babel/preset-env'], // Ensure modern JavaScript syntax compatibility
      plugins: [
        [
          'babel-plugin-template-html-minifier',
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
  ],
};