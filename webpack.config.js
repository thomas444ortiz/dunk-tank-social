const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|cjs|mjs)$/, // if a file name ends with any of these strings
        exclude: /node_modules/, // don't apply these rules to anything in the node_modules folder
        use: [
          {
            loader: 'babel-loader', // use the babel-loader to transpile these files to javascript that the browser can understand
            options: {
              presets: [['@babel/preset-env'], ['@babel/preset-react']],
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },     
    ],
  },
  entry: './client/index.js', // starts the entrypoint of creating the dependency tree with this file
  output: {
    path: path.resolve(__dirname, 'build'), // outputs the bundle.js file into the build folder (which it also builds) at the specified filepath
    filename: 'bundle.js',
  },
  devServer: { // creates a development server
    static: {
      directory: path.join(__dirname, 'client'), // uses all code from the client folder to make bundle and render dev server
    },
    proxy: {
      '/': { // whenever we make an http request to the path /api, it redirects it from 8080 to 3000 to go to the backend automatically
        target: 'http://localhost:3000',
      },
    },
    compress: true,
    port: 8080,
    // historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.css'], // this will resolve extension on imports in our project
  },
  mode: process.env.NODE_ENV, // variable that will store whether we are using dev or prod server
};
