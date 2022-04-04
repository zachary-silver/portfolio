const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
   devtool: 'eval-source-map',
   entry: './src/bootstrap.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
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
   resolve: {
      extensions: ['*', '.tsx', '.ts', '.js', 'jsx'],
   },
   mode: 'development',
   devServer: {
      historyApiFallback: true,
   },
   plugins: [
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, './src/index.html'),
            },
            {
               from: path.resolve(__dirname, './public/favicon.ico'),
            },
            {
               from: path.resolve(__dirname, './public/ZacharySilverResume.pdf'),
            },
            {
               from: path.resolve(__dirname, './public/twitch-chat-sentiment-analysis.jpg'),
            },
            {
               from: path.resolve(__dirname, './public/dwmstatus.jpg'),
            },
            {
               from: path.resolve(__dirname, './public/tic-tac-toe.jpg'),
            },
            {
               from: path.resolve(__dirname, './public/silver-calculator.jpg'),
            },
            {
               from: path.resolve(__dirname, './public/music.jpg'),
            },
         ],
      })
   ],
   experiments: {
      syncWebAssembly: true,
   }
};
