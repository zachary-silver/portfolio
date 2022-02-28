const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
   devtool: 'eval-source-map',
   entry: './src/bootstrap.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx|ts|tsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
         },
      ],
   },
   resolve: {
      extensions: ['*', '.tsx', '.ts', '.js', 'jsx'],
   },
   mode: 'development',
   plugins: [
      new CopyWebpackPlugin(['./src/index.html'])
   ],
};
