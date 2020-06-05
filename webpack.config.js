const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  const isProduction = env || undefined;
  console.log("env and isProduction", env, ":", isProduction);

  return {
    entry: ["babel-polyfill",path.join(__dirname, "frontend/src/app.js")],
    devServer: {
      contentBase: path.join(__dirname, "frontend/public", "dist"),
      hot: true,
      inline: true,
      historyApiFallback: true,
      watchContentBase: true,
      port: 8001,
      watchOptions: {
        ignored: [
          path.resolve(__dirname, "/frontend/public/"),
          path.resolve(__dirname, "/node_modules/"),
        ],
      },
    },
    output: {
      path: path.join(__dirname, "frontend/public", "build"),
      publicPath: "/",
      filename: "bundle.js"
    },


    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
          loader: "url-loader"
        }
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: isProduction ? "cheap-source-map" : "cheap-module-eval-source-map",

  };
};
