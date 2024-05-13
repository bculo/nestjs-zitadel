const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/todo'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      transformers: [
        {
          // adds augmentation of DTO objects, see https://docs.nestjs.com/openapi/cli-plugin
          name: "@nestjs/swagger/plugin",
          options: {
            introspectComments: true
          }
        }
      ]
    }),
  ],
};
