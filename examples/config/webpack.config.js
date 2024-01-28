const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const examplesDir = path.join(__dirname, "..");
const examples = fs.readdirSync(examplesDir).filter(f => f.endsWith(".js"));
const entries = examples.reduce((result, example) => {
   result[example] = path.resolve(__dirname, `../${example}`);
   return result;
}, {});

module.exports = {
   mode: "development",
   watch: true,
   entry: entries,
   output: {
      publicPath: `/dist/`,
      filename: "[name]"
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
         }
      ]
   }
   // TODO: Add hot module replacement
   // plugins: [
   //    new webpack.HotModuleReplacementPlugin()
   // ]
}
