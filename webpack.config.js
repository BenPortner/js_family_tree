const path = require("path");

module.exports = {
   mode: "production",
   entry: {
      main: "./js/familytree.js"
   },
   output: {
      path: path.resolve(__dirname, ".", "dist"),
      filename: "index.js",
      globalObject: "this",
   library: {
      name: "FamilyTree",
      type: "umd",
    }
   },
   externals: {
      d3: "d3"
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
}
