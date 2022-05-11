const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   context: path.resolve(__dirname, './src'),
   mode: 'development',
   entry: './index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './bundle.js',
   },
   devServer: {
      hot:false,
      liveReload: true,
   },

   plugins: [
      new HtmlWebpackPlugin({
      template: './index.html',
      }),
      new CleanPlugin(),
    new CopyPlugin({
      patterns: [
      {
        from: path.resolve(__dirname, './src/assets/icons/favicon.ico'),
        to: path.resolve(__dirname, './dist'),
      }
      ]
    }),
   ],

   module: {
      rules: [ 
      {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
      test: /\.(ttf|woff|woff2)$/,
      type: 'asset/resource',
      },
      {
      test: /\.(png|jpg|svg|gif)$/,
      type: 'asset/resource',
      },
      ]
   }
};