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