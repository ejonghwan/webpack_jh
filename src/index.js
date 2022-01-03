import ag from './images/ag.jpeg'
import star from './images/star.png'
import './css/style.css'


import { sum, imggg } from './math.js'


console.log( sum(2, 3) )

window.onload = function() {
    const imgtag = document.querySelector('.imggg')
    const imgtag22 = document.querySelector('.imggg22')
    console.log(imgtag)
    
    

    // imgtag.innerHTML = `<img src="${ag}">`

    imggg(imgtag, ag)
    imggg(imgtag22, star)




    console.log('디파인 플로그인: ', process.env.NODE_ENV) //기본 mode 반환
    console.log('디파인 플로그인: ', TWO) //숫자
    console.log('디파인 플로그인: ', TWO2) // 문자열
    console.log('디파인 플로그인: ', api.domain) // 객체형식
    

}