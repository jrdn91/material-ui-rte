const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

/* Environment */
const nodeEnv = process.env.NODE_ENV || "development"
const DEVELOPMENT = nodeEnv === "development"
const PRODUCTION = nodeEnv === "production"

module.exports = {
  mode: nodeEnv,
  entry: path.resolve(__dirname, "src", "index.js"),
  externals: [
    {
      react: "react",
      "react-dom": "react-dom",
      clsx: "clsx"
    },
    /^(\@material-ui\/[\w\/]+)$/i
  ],
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: "Material-UI RTE",
    libraryTarget: "umd",
    umdNamedDefine: true,
    /**
     * UMD modules refer to "window", which breaks SSR.
     * @see https://github.com/webpack/webpack/issues/6522
     */
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.BABEL_ENV": JSON.stringify(nodeEnv)
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "editor.css"
    })
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: DEVELOPMENT
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
