// 커스텀 로더

module.exports = function myWebpackLoader (content) {  // 웹팩 로더? js? 들이 로더를 읽고 컨텐츠 인자로 들어옴
    console.log('커스텀 로더안에 콘솔이 작동됨')
    
    // content는 모든 js파일들

    // 모든 js안에 console.log를 만나면 alert로 변경하는 동작
    // return content.replace('console.log(', 'alert(')
    return content;
}