import ag from './images/ag.jpeg'
import star from './images/star.png'
import './css/style.css'
import axios from 'axios'


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



    /*
        아래 코드는 바벨 폴리필이 core-js를 사용해서 변환해줄텐데 
        그러려면 폴리필로 들어가는 패키지도 설치가 되어있어야한다 즉 core-js 설치

        error msg 
        Module not found: Error: Can't resolve 'core-js/modules/es6.object.to-string.js' in '/Users/a80118535/Desktop/webpack/src'@ ./src/index.js 1:0-49
    */
    // new Promise()



    /* 
        async await 는 
        regenerator-runtime 이라는 폴리필 넣어야됨... 
        !!? 근데 안넣어도 됨 -_-;; 버전업 돼서 그런가 ?
    */
    async function getData(url) {
        const data = await axios.get(url)
        // console.log(data)
        return data.data
    } 

    getData('http://jsonplaceholder.typicode.com/todos').then((data) => {
        const ele = document.querySelector('.data');
        // console.log('qwkdqwkdljlqwkd', data)

        data.map( (item, idx) => {
            if(idx < 10) {
                return ele.innerHTML += `
                userid: ${item.userId} <br />
                id: ${item.id} <br />
                title: ${item.title} <br /><br />
            `
            }
            
        })
    })


    // proxy test... 종로그 백엔드로 요청 http://localhost:3000/api/post
    // 되네 ...ㅎㄸㄸㄸㄸ 

    // const backend = async() => {
    //     const res = await axios.get('http://localhost:3000/api/post')
    //     console.log('jonglog backend: ', res) 
    // }

    // backend();





    console.log(123123123)
    // window는 셋 붙여줌 set NODE_ENV=production




}


// webpack dev server api 
document.addEventListener('DOMContentLoaded', async () => {
    const res = await axios.get('/api/users')

    if(res.data) {
        res.data.map(item => {
            return document.body.innerHTML += `<div>
            name: ${item.name}
            </div>
        `
        })
    }
    

    //  document.body.innerHTML = (res.data || []).map(item => {
    //         return `<div>
    //         name: ${item.name}
    //         </div>
    //     `
    // }).join(" ")

    // json 데이터 뿌릴 때 , 생기면 뒤에 .join(" ") 해주면 됨

    console.log(res)
})
