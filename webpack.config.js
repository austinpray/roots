// Webpack Configuration
// =====================

// ## Dependencies
var path = require("path");
var webpack = require("webpack");
var glob = require("glob");

// ### Webpack Plugins
var AssetsPlugin = require("assets-webpack-plugin");
var Clean = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// ## User Configuration
// This is probably what you are interested in editing.
var config = {
  // The final output path
  dist: path.join(__dirname, "dist")
};

module.exports = {
  entry: {
    main: [
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client",
      "./assets/scripts/index"
    ]
  },
  output: {
    path: config.dist,
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  resolve: {
    modulesDirectories: [
      "web_modules",
      "node_modules",
      "bower_components"
    ]
  },
  module: {
      loaders: [
        {
          // Use *.json.js extension to bake exported JS data into JSON
          test: /\.json\.js/,
          loader: 'json'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(png|jpg|jpeg|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel?optional[]=runtime"
        }
    ]
  },
  externals: {
    "jquery": "jQuery"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new AssetsPlugin({
      path: config.dist
    }),
    new ExtractTextPlugin("[name].styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new Clean([config.dist]),
    function() {
      var crypto = require('crypto');
      var fs = require('fs');
      // TODO: extract me into an npm package please
      this.plugin("done", function() {
        // TODO: make this stuff configurable
        glob("./assets/images/**/*", function (er, files) {
          if (files.length > 0) {
            var manifest = {};
            files.forEach(function (file) {
              var chunkhash = crypto
                .createHash('md5')
                .update(fs.readFileSync(file))
                .digest('hex');
              manifest[file] = path.join("dist", chunkhash + path.extname(file));
            });
            // TODO: error handling
            // TODO: async
            for(var file in manifest) {
              fs.writeFileSync(
                path.join(__dirname, manifest[file]),
                fs.readFileSync(file));
            }
            fs.writeFileSync(
              path.join(__dirname, "dist", "webpack-images.json"),
              JSON.stringify(manifest));
          }
        });
      });
    }
  ]
};
