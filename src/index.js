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


    // console.log(11)

    // document.querySelector('body').innerHTML = 'asdadasdasdadasd'

}