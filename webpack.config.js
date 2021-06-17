const path = require('path')

// commenjs 语法
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './build'), // 必须是绝对路径
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
}
