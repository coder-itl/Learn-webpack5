# Learn-webpack5

+ 清除`git`缓存使`.gitignore`文件生效

  ```bash
  git rm -r --cached .
  ```

+ 官方文档

  ```bash
  https://webpack.js.org/
  ```

+ 个人整理文档引入

  ###  Webpack5

  + `webpack`的安装

    ```bash
    npm install webpack webpack-cli -g
    
    
    webpack --version
        webpack 5.39.0
        webpack-cli 4.7.2
        
        
    ```

  + 基础使用

    + 目录结构

      ```javascript
      D:.
      │  index.html 
      │
      ├─dist
      │      main.js 最终打包文件
      │
      └─js
              format.js [commonjs]
              index.js  使用以上两个模块
              math.js [模块导出]
      
      
      在 html 文件直接引入 index.js 文件是不会得到执行
      
      ```

      + 执行 `webpack ./js/index.js`得到的 `./dist/main.js`才能得到最终解析

        

        ![H5-review-webpack.gif](https://i.loli.net/2021/06/16/U2dsQltMijh8ngm.gif)

        

      + 项目需要局部的`webpack`

        ```javascript
        npm init -y // 生成 package.json
        
        npm install webpack webpack-cli --save-dev  [-D]
        
        # 配置 webpack
        package.json:
        	
        	script: "build":'webpack' [ 存在 error时添加该形式: webpack ./js/index.js]
                		
                		--> 后续只需要执行: npm run build 
        
        ```

      + 新增文件`webpack.config.js`的`webpack`配置文件 与 `src`同级目录

        ```javascript
        // node 的 path 模块
        const path =  require('path');
        
        module.exports = {
            entry: './src/js/index.js', // 入口文件读取
            output:{
                path: path.resolve(__dirname,'./build'), // 绝对路径为绝对路径
                filename: 'bundle.js' // 输出的文件名称
            }
        }
        
        package.json:
        	script: 
        		"build":"webpack --config webpack.config.js"
        
        ```

      + `css-loader`

        ```css
        在 js 文件中依赖 css 文件,只有文件相互依赖才会在打包时被打包
        
        import '../css/style.css'
        
        ```

        ![css-loader.png](https://i.loli.net/2021/06/16/efScoXJCEgIVUdH.png)

        + 安装`css-loader`

          ```bash
          npm install --save-dev css-loader
          ```

        + 配置`css-loader`

          ```javascript
          1. 内联配置 import 'css-loader!../css/style.css'
          
          
          ```

        + `style-loader`

          ```bash
          npm install --save-dev style-loader
          ```

          ```bash
          # css-loader 需要配合 style-loader 才能显示,并且需要注意 use 的书写顺序
          
          use: ['style-loader', 'css-loader']
          
          ```

    + `less`

      ```bash
      npm install --save-dev less
      ```

    + `postcss-loader`

      ```bash
      npm install --save-dev postcss-loader postcss
      ```

      + 抽离配置文件

        ```javascript
        新建文件: postcss.config.js
        插件安装:
        	npm install autoprefixer --save-dev  // 添加浏览器前缀 【一般不用】
        ```

      + `postcss-preset-env`

        ```bash
        npm install postcss-preset-env --save-dev
        ```

    + `file-loader`用于图片资源处理

      + 问题引出

        ![file-loader.png](https://i.loli.net/2021/06/17/XZqQYrDsVRzb1l3.png)

        

      + 安装

        ```bash
         npm install file-loader --save-dev [webpack5 不在推荐使用]
        ```

      + 配置

        ```javascript
        {
                test: /\.(png|jpe?g|gif)$/i,
                use: 'file-loader',
        },
        ```

      + 注意: `文件以模块的形式引用`

        ```javascript
        // 图片
        import imgArrialsName from "file-path"
        
        const imgE = document.createElement('img')
        imgSrc.src = imgArrialsName
        
        document.body.appendChild(imgE)
        
        ```

        + 文件的命名规则

          ```bash
          placeholder:
          [ext]
          [name]
          [hash]
          ...
          ```

        + 文件打包后的路径配置

          ```bash
          file-loader 重新配置:
          {
                  test: /\.(png|jpe?g|gif)$/i,
                  use: {
                    loader: 'file-loader',
                    options: {
                      outputPath: 'img', // 打包后的文件路径
                      name: 'img/[name]-[hash:6].[ext]', // Vue 简写去除 outputPath
                    	limit: 100 * 1024 // 小于 100 进行 base64 转换
                    },
                  },
                },
          ```

          ```bash
          file-loader placehoders文档: https://v4.webpack.js.org/loaders/file-loader/#placeholders
          ```

    + `url-loader`

      + 安装

        ```bash
        npm install url-loader --save-dev
        ```

        

      + 配置`替换 file-loader`

        ```javascript
        {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                  loader: 'file-loader',
                  options: {
                    outputPath: 'img', // 打包后的文件路径
                    name: 'img/[name]-[hash:6].[ext]', // Vue 简写去除 outputPath
                  	limit: 100 * 1024 // 小于 100 进行 base64 转换
                  },
                },
              },
        ```

      + `webpack5`之前加载资源需要使用对应的 `loader`，而在 `webpack5,我们可以直接使用资源模块类型(asset module type)来替代上面的这些 loader`

        + 资源模块类型

          {% tip home %}

          + `asset/resource` 发送一个单独的文件并导出 `url`，之前通过 `file-loader`实现
          + `asset/inline` 导出一个资源`data url` 之前通过 `url-loader`实现
          + `asset/source`导出资源的源代码,之前通过 `raw-loader`实现
          + `asset` 在导出一个 `data url` 和发送一个单独的文件之间自动选择,之前通过`url-loader`，并且配置资源体积限制实现

          ```javascript
          {
               test: /\.(png|jpe?g|gif)$/i,
               type: 'asset',
               // 注意名称 name 和 filename 前提
               generator: {
                   filename: 'img/[name]_[hash:6][ext]',
                     },
               parser: {
                 dataUrlCondition: {
                 maxSize: 100 * 1024,
                 },
              },
          }
          ```

          {% endtip %}

  + 加载字体文件

    ```javascript
    // 前提: 对字体文件进行依赖
    
    {
        test:/\.(eot|ttf|woff2?)$/,
    	use:{
              loader: 'file-loader',
                  options:{
                     // outputPath: 'font',
                      name: "font/[name]_[hash:6].[ext]"
                  }
            }
    }
    ```

    

  + `webpack`插件

    ```javascript
    // 解决打包文件需要手动删除的问题
    
    plugin:
    	
    ```

    + 安装

      ```bash
      npm install clean-webpack-plugin -D
      ```

    + 使用`webpack.config.js`

      ```javascript
      const {CleanWebpackPlugin} = require("clean-webpack-plugin")
      
      
       plugin: [new CleanWebpackPlugin()],
           
           
      ```

  + `HtmlWebpackPlugin`

    ```javascript
    // index.html 进行打包处理
    
    
    // 安装
    npm install html-webpack-plugin -D
    
    ```

  + 自定义`html`模板

    + `DefinePlugin`

      ```html
      <link rel="icon" href="<%= BASE_URL %>favicon.ico">
      <title>
          <%= htmlWebpackPlugin.options.title %>
      </title>
      ```

    + 复制插件

      + 安装

        ```bash
        npm install copy-webpack-plugin -D
        ```

      + 使用

        ```bash
        const CopyWebpackPlugin = require('copy-wwebpack-plugin')
        
        new CopyWebpackPlugin({
              patterns: [
                {
                  from: 'public', // 从哪里复制
                  to: 'build', // to: 可以省略 会自动读取上下文 作用:复制到哪里
                  globOptions: {
                    ignore: [], // 忽略文件
                  },
                },
              ],
            }),
        ```

    + `mode`配置

      ```bash
      作用: 解析错误
      
      /*
      * 设置模式:
      *   development: 开发阶段 会设置 development
      *   production 准备打包上线的时候,设置 production
      *
      * 设置 source-map 建立 js 映射文件，方便调式代码和错误
      */
        mode: 'development',
        devtool: 'source-map',
        
        
      ```

      

