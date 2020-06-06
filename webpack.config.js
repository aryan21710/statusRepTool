const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin= require("extract-text-webpack-plugin")

module.exports = (env) => {
  const isProduction = env === "production";
  console.log("env and isProduction", env, ":", isProduction);

  const CSSExtract= new ExtractTextPlugin('webpackExtractedStyles.css')

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
          use: CSSExtract.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },{
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }]
          })
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
          loader: "url-loader"
        }
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), CSSExtract],
    devtool: isProduction ? "cheap-source-map" : "inline-source-map",

  };
};
