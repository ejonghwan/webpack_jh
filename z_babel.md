## 사용 방법
1. babel 관련파일 설치 
2. babel.config.js 작성 ..자세한 셋팅방법은 babel.config.js 파일안에 있음  
3. babel-laoder로 webpack에 연결 


## 설치는 아래 세개 
@babel/core 
@babel/cli - 터미널에서 사용하기 위한
@babel/preset-env - 플로그인이 모여있는


## babel.config.js 여기말고 파일에서 확인
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                chrome: '79', // 크롬 79 이상버전에 맞춰줘 
                ie: '11',
            },
            useBuiltIns: 'usage', // 'entry', false
            corejs: { // new Promise()는 es5로 변환이 불가능하기에 corejs라는 폴리필 붙여서 ..
                version: 2, //3
                /*  실행결과 .. corejs 라이브러리가 붙음
                    require("core-js/modules/es6.object.to-string.js");
                    require("core-js/modules/es6.promise.js");
                */
            }
        }]
    ]
}


## 웹팩에 연결 
babel-loader 설치 후 웹팩에 아래 설정
{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/, //제외 할 피일
},