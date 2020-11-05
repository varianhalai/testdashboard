const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');



 
module.exports = {
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      maxAsyncRequests: 5,
    },minimizer: [
      new TerserPlugin({
        include: /\/includes/,
      }),
    ],
  },
  
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx|json|png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: ['babel-loader','file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx','.json','.png'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};