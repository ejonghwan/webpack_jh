## 버전 구분법
v1.2.3
1은 이전버전과 호환이 안됨 2는 호환되면서 패치 3은 버그 수정 등

~1.2.3   2번째 버전이 명시되어있으면 패치버전 변경
^1.2.3   패치버전까지만 맞춰줌 



## 사용방법
1. webpack 다운로드
2. wepback.config.js 설정 ... 설정에 대한 자세한 내용은 파일안에 있음


## 웹팩  설치
webpack
webpack-cli
webpack-dev-server

## 자주쓰는 로더 
css-loader
style-loader

file-loader
url-loader

@babel/core
@babel/cli
@babel/preset-env
babel-loader

## 자주쓰는 플로그인 
html-webpack-plugin
mini-css-extract-plugin
clean-webpack-plugin
webpack.BannerPlugin({})
webpack.DefinePlugin({})




## 웹팩 구성
webpack.config.js
mode - 프로덕션 디벨롭먼트 논 모드 제공
entry - 시작되는 js파일 경로
output - 내보낼 경로 ..node path 사용
module - 사용할 로더들 
plugins - 사용할 플로그인들

devServer - 웹팩 데브서버 패키지 실행




## webpack dev server
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



## 최적화 !!
1. mode: 'production' 으로 변경
2. optimazation 속성으로 최적화 optimize-css-assets-webpack-plugin
   - 얘는 웹팩 첫번째 뎁스에 설정함
    optimization : {
        minimiser: process.env.NODE_ENV === 'production' ? [] : []
      }
