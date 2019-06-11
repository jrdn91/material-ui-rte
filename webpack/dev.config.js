const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJson = require('../package.json');
const { version, name } = packageJson;

module.exports = {
  entry: "./src/index.js",
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.join(__dirname, "../", "dev"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    historyApiFallback: true,
    port: 4400
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        exclude: [/node_modules/, /public/]
      },
      // {
      //   test: /\.s?css$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new HtmlWebpackPlugin({
      title: name,
      version,
      template: './src/html/index.html',
      inject: true
    })
  ]
};