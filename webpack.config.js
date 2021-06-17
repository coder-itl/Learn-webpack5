const path = require('path')

// 导入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// webpack 内置插件
const { DefinePlugin } = require('webpack')

// commenjs 语法
module.exports = {
  /*
   * 设置模式:
   *   development: 开发阶段 会设置 development
   *   production 准备打包上线的时候,设置 production
   * 设置 source-map 建立 js 映射文件，方便调式代码和错误
   */
  mode: 'development',
  devtool: 'source-map',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './build'), // 必须是绝对路径
    filename: 'js/bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name]_[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public', // 从哪里复制
          //  to: 'build', // 复制到哪里
          globOptions: {
            ignore: ['**/index.html'], // 忽略文件
          },
        },
      ],
    }),
  ],
}
