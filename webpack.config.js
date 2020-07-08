// What we are doing is we are just requiring the package of webpack.
var webpack = require("webpack");
var path = require("path");

// So we are exporting an object and in this object is where we're going to put in basically all of our settings for our webpack.
module.exports = {
  // entry is where we're coming in and then we're going to say "Hey this is our entry file."
  // This is what webpack is going to load.  And then, from there, we're going to find the location to where we are going to export it to.
  // This is the entry place.
  // The entry is where the file comes in.
  entry: {
    // This string is going to have the location of the JavaScript file.
    // This is going to hold all of your JavaScript.
    firstComp: "./src/js/firstComp/index.js",
    cart: "./src/js/cart.js",
    // The array is going to have the names of the libraries that you are going to use in your JavaScript.
    // This is going to hold all of the external libraries.
    vendor: ["react"]
  },
  // This is the output.
  // The output is the location where we are going to output this file.
  output: {
    // What we mean here is that the filename is going to be named, "[name].js", according to the name of the property inside the entry object above, which is currently firstComp.  If the property above was named app, then the file that gets exported would be app.js.
    filename: "[name].js",
    // We are going to output this file to /public/js/components.
    path: path.resolve(__dirname, "public/js/components")
  },
  // For every module, there are rules.
  // Once again we do another object.
  module: {
    // Inside of this array is where we put in the rules, depending on what file it is.
    // We are setting up all of the rules and then we are going to download a couple of packages, too.
    rules: [
      {
        // What we're basically saying here is "Hey any file that ends in .js."
        // We're basically saying any file that ends in .js, we give it these rules.
        test: /\.js$/,
        // Here we are saying "Exclude the node_modules."  Any file that comes from node_modules, we are excluding it.
        exclude: /node_modules/,
        // We're basically using a babel-loader.
        // Webpack is going to take ES6 and convert it to regular JavaScript for us.  I don't know if this comment belongs on this line.
        // We're using babel-loader
        loader: "babel-loader",
        options: {
          // We're using presets es2015 and modules: false.
          presets: [["es2015", { modules: false }]]
        }
      }
    ]
  },

  // Now we are going to add another property.  This one  is going to be named plugins.
  // Just like gulp, webpack has its own plugins that you can add to it.
  // All of this stuff you can find it in the documentation at webpack.js.org.  It's trial and error.  You look at the documentation and start building from there.  Joe will not go too deep into webpack because in reality there is no need for him to go in too deep when you have the documentation and the documentation is that good.
  // Pretty much you can take the same setup that we have and add the plugins as you need them.  Extra things that you may need later on, but what you are seeing now is what you need.
  plugins: [
    // Here we are adding this new plugin.  What this is doing is setting up CommonsChunkPlugin.
    // When you bundle up a project, all of the files that come in as entry points, in the entry property at the top, they basically have imports.
    // The way this plugin is setup is where you have your code there, firstComp, and there is also another file called vendor.
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        // This assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap:
    //     options.devtool &&
    //     (options.devtool.indexOf("sourcemap") >= 0 ||
    //       options.devtool.indexOf("source-map") >= 0)
    // }),
    // new webpack.Define
    // new webpack.optimize.CommonsChunkPlugin({
    // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    //   name: "manifest"
    // })
  ]
};
