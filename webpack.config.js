const path = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	//入口
  entry: './src/app.jsx',
  output: {
  	//文件打包目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  resolve: {
        alias : {
          page: path.resolve(__dirname, 'src/page'),
          component: path.resolve(__dirname, 'src/component')
        }
  },
  module: {
    rules: [
      //react语法处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env','react']
          }
        }
      },
      // css样式配置
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
      },
       // sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: ['css-loader', 'sass-loader']
        })
      },
      //图片加载
       {
        test: /\.(png|jpg|gif)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'resource/[name].[ext]'
                }
            }
        ]
      },
       // 字体图标的配置
      {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 8192,
                      name: 'resource/[name].[ext]'
                  }
              }
          ]
      }
    ]
  },
    //生成index.html
   plugins: [
       new HtmlWebpackPlugin({
          //自定义的模板
       		template: "./src/index.html"
       }),
       //独立css文件
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/base.js'
        })
   ],
   devServer:{
        // contentBase: './dist'
       port:8086,
       // 404的时候回访问index.html
       historyApiFallback: {
            index: '/dist/index.html'
        }
   }
};