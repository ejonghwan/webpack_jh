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
        minimiser: process.env.NODE_ENV === 'production' ? [
          여기에 3번도 같이넣음... 설정코드는 webpack.config.js 파일에
        ] : [],
        splitChunks: { // 이게 4번 코드스플리팅 소스옵션
          chunks: "all" 
        }
      }

3. 콘솔을 한번에 지우기  terser-webpack-plugin
 - 위에 optimazation에 넣음



4. 코드 스플리팅
 - entry: {
    main: './src/main.js',
    result: './src/result.js'
  } 
  2개로 나누고 청크옵션 

 - 엔트리 포인트를 두개로 쪼개서 빌드하면 dist에 두개로 쪼개짐..근데 두개로 나누면 axios같이 한개의 모듈을 두곳에서 쓰면 두개가 됨... 그래서 중복을 제거하는 옵션을 또 켜줌 
 "2번 optimization에 추가"


5. 다이나믹 임폴트 (4번 코드스플리팅은 손이 많이 가므로 코드스플리팅을 자동화 )
  <!-- 선생님 소스 -->
  
  <!-- 원본소스 -->
  import result from './src/result.js'

  const resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl)


  <!-- 다이나믹 임폴트 import 할때 주석으로 이름지정해주면 웹팩이 알아서 코드스플리팅 해줌-->
  <!-- 이렇게 하면 소스나눈거랑 청크옵션은 필요없음 -->
  <!-- 코드스플리팅 같은 경우는 개발초기에는 필요없고 1mb 넘어가면 그때부터 시작해도 됨 -->
  import(/* webpackChunkName: "result" */'./src/result.js').then( async m => {
      m = 
      const resultEl = document.createElement("div");
      resultEl.innerHTML = await result.render();
      document.body.appendChild(resultEl)
  })



6. externals .. 필요없는 것들은 번들링에서 뺌
  - ex) axios 같은 경우엔 이미 완성품 다운받은게 있기 때문에 패키지를 그대로 쓰면 되니 번들링에 포함시킬 필요가 없다 .

  - 설정방법
  module.exports = {
    externals: {
      axios: 'axios', // 빌드할 때 axios를 사용하는 소스가 있으면 전역변수 axios를 사용해라
    }
  }

  - js 파일안에서 import axios from 'axios' 라는 것을 만나면 패키지를 가져오지않고 있는 것처럼 빌드를 함.
    때문에 빌드된 dist 폴더에는 axios 모듈이 있어야함 
    그래서  copy-webpack-plugin 으로 복사

    설정방법
    1. npm i -D copy-webpack-plugin 
    2. webpack.config.js  plugin에 설정 추가
        new copyPlugin([
          {
            from: './node_modules/axios/dist? src?/axios.min.js', //어디에있는 패키지인지 
            to: './axios.min.js' //어디로 복사할지
          } // 이거 설정하고 index.html에도 src로 가져와야됨
        ]),
    3. index.html에 <script src="axios.min.js"></script> 추가
  
  

  


