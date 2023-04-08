const path = require('path')

module.exports = {
   mode: 'production',
   entry: {
      main: './js/familytree.js'
   },
   output: {
      path: path.resolve(__dirname, '.', 'dist'),
      filename: 'index.js',
      globalObject: 'this',
   library: {
      name: 'FamilyTree',
      type: 'umd',
    }
   },
   externals: {
      // react: {
      //    commonjs: 'react',
      //    commonjs2: 'react',
      //    amd: 'React',
      //    root: 'React'
      // },
      // 'react-dom': {
      //    commonjs: 'react-dom',
      //    commonjs2: 'react-dom',
      //    amd: 'ReactDOM',
      //    root: 'ReactDOM'
      // }
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         }
      ]
   }
}
