const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MyWebpackPlugin = require('./myWebpackPlugin')


module.exports = {
    mode: 'none', //development production
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
          { //커스텀 로더.. 모든 js파일을 가져올 때 커스텀 로더를 거침
            test: /\.js$/,
            use: [
              path.resolve('./myWebpackLoader.js')
            ]
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            // use: [ { loader: MiniCssExtractPlugin.loader },"css-loader" ]
          },
          
          // {
          //   test: /\.png|jpg|svg|gif|jpeg$/,
          //   use: [{
          //     loader: 'file-loader',
          //     options: {
          //       name:'[name].[ext]?[hash]',
          //       outputPath: './src/images',
          //     }
          //   }]
          // },
          {
            test: /\.png|jpg|gif|jpeg|svg$/,
            loader: 'url-loader',
            options: {
              // publicPath: './dist/',
              outputPath: './src/images',
              name: '[name].[ext]?[hash]',
              limit: 25000, //25kb이상 안넘어가는(작은) 것만 처리..data: asdasdasd 이런 문자열로. 넘지않는건 파일로더가 처리
            }
          },
        //   {
        //     test: /\.woff|woff2|eot|ttf|otf$/,
        //     use: [{
        //       loader: 'file-loader',
        //       options: {
        //         // name:'[name].[ext]?[hash]',
        //         outputPath: './src/assets/font',
        //       }
        //     }]
        //   },
          
        ]
      },

    plugins: [
        // new HtmlWebpackPlugin({ tamplate: './index.html'}), //오타 시발
        new HtmlWebpackPlugin({  
          template:'./index.html',
          filename:'./index.html',
      }),
        new CleanWebpackPlugin(),
        new MyWebpackPlugin() // 커스텀 플러그인
    ],
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, "/src"),
        // host : '127.0.0.1',
        // contentBase: path.join(__dirname, "/"),
        // compress: true,
        // hot : true,
        // inline: true,
        // port: 9000,
        // open : true
      }

}