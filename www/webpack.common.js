const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
   entry: './src/bootstrap.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
   },
   resolve: {
      extensions: ['*', '.tsx', '.ts', '.js', 'jsx'],
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx|ts|tsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
         },
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/index.html'),
            },
            {
               from: path.resolve(__dirname, 'public/*'),
               to: '[base]',
            },
         ],
      })
   ],
   experiments: {
      syncWebAssembly: true,
   }
};
