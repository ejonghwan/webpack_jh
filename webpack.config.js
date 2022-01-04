const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css 하나로 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MyWebpackPlugin = require('./myWebpackPlugin');
const webpack = require('webpack'); //웹팩 기본 플로그인은 여기있음
const childProcess = require('child_process') // 터미널 명령어를 이거로 실행 할 수 있음 


module.exports = {
    mode: 'production', //development production none
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
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/, //제외 할 피일
            // exclude: ['/node_modules'], // 이렇겐 안되네 ..?
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            // use: [ { loader: MiniCssExtractPlugin.loader }, "css-loader" ] 
            // use: [
            //   {loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'}, 'css-loader'
            // ] // 이거 여기서 안됨 근데 버전 문제인듯 
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
          // {
          //   test: /\.woff|woff2|eot|ttf|otf$/,
          //   use: [{
          //     loader: 'file-loader',
          //     options: {
          //       // name:'[name].[ext]?[hash]',
          //       outputPath: './src/assets/font',
          //     }
          //   }]
          // },



          /*
            이건 걍 설정파일만 작성... .sass는 사스만 쓰는. .scss는 css같이쓰는
            sass는 sass-loader (loader) 와 
            node-sass (sass를 css로 컴파일)
            두개 설치 
          */
          // {
          //   test: /\.s[ac]ss$/i, //.(scss|css)
          //   use: ['style-loader', 'css-loader', 'sass-loader',] 
          //   //오른쪽부터 처리.. 사스를 css로 컴파일 후 commonsJS형태로 변환 후 html에 style에 추가
          // }
          

          
        ]
      },

    plugins: [
        // new HtmlWebpackPlugin({ tamplate: './index.html'}), //오타 시발
        new HtmlWebpackPlugin({   
          template:'./src/index.html', // 현재 작업하는 파일 위치
          filename:'./index.html', // 어디에 만들어놓을지 
          templateParameters: {
            env: process.env.NODE_ENV === 'development' ? '(개발용)' : '' // index.html에 ejs문법으로 넣어둠
          },
          minify: process.env.NODE_ENV === 'production' ? { // 배포할떄만 삭제
            collapseWhitespace: true, // 띄어쓰기 삭제
            removeComments: true, //주석 모두 삭제
          } : false,
      }),
        new CleanWebpackPlugin(), // 웹팩 빌드 시 dist폴더에 불필요한거 지워줌
        new MyWebpackPlugin(), // 커스텀 플러그인
        new webpack.BannerPlugin({  // 커스텀으로 만들었던 배너 플로그인.. 웹팩이 제공해주는 기본 플로그인
          banner: `
            Build Data: ${new Date().toLocaleDateString() }
            GIT Commit Ver: ${childProcess.execSync('git rev-parse --short HEAD')} 
            
          `
          // user name : ${childProcess.execSync('git config user.name')}  유저네임 왜 안찾아지지 
        }),

        // 개발버전과 운영버전을 나눠서 한번에 처리하기 위해 dotenv로 관리
        // 기본적으론 웹팩설정의 mode 를 반환해줌
        new webpack.DefinePlugin({
          TWO: '1+1', // 2출력. 개인적으로 설정하고 싶으면 다른 페이지에서 TWO로 접근가능.. console.log(TWO)
          TWO2: JSON.stringify('1+1'), //문자열 값을 넘기고 싶으면 
          'api.domain': JSON.stringify('http://dev-api.domain.com') // 객체 형식도 지원해줌 접근: console.log(api.domain)
        }),

        // css 하나로 ..배포할 때만 하는게 좋음.. ??뭐야 문법 이렇게도 쓰네 ㅎㄸㄷ.....
        ...(process.env.NODE_ENV === 'production' ? [ new MiniCssExtractPlugin({ filename: '[name].css' }) ] : [])
        

    ],

    devServer: {
        port: 9000, 
        contentBase: path.join(__dirname, "/src"), // 경로지정
        // host : '127.0.0.1', // 도메인 설정. 쿠키인증이나 그럴때 서버랑 도메인 맞출때 씀
        // compress: true,
        // hot : true,
        // inline: true,
        // open : true,
        // overlay: true, // 콘솔이 아니라 화면에 출력할 때 
        // state: 'none' // 'errors-only' 'minimal' 'normal' 'verbose' 메시지 수준 정함
        before: app => { //express 처럼 쓸수도 있다
          app.get('/api/users', (req, res) => {
            res.json([
             {
              id: 1,
              name: 'alice',
             },
             {
              id: 2,
              name: 'bek',
             },
             {
              id: 3,
              name: 'cree',
             },
            ])
          })
        },

        //프론트에서 CORS 오류 해결방법 프록시 서버
        // api로 요청을 시작하면 앞에 주소를 value에 주소로..  내부적으로 서버주소로 요청을 보냄 
        proxy: { 
          '/api': 'http://localhost:3000' // 서버주소
        },
        



        // 핫 로딩 [HMR]! 버뀐 모듈만 리프래시됨.. 근데 이거만 하면 최적화는 안됨.. 
        hot: true,
        
        /* 자세한건 강의에서 ..개인적으론 안쓸듯
          index.js에서

          if(module.hot) { console.log('핫 모듈 켜짐') }
          module.hot.accept("/result", () => {
            여기 안에다 갱신되는 함수들 다시 넣어주면 된다
            console.log('result 모듈 변경됨')
          })
          
        */ 

      },
      optimization : {
        minimiser: process.env.NODE_ENV === 'production' ? [] : []
      }

}