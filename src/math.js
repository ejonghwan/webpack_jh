import { testimg } from './components/view.js' 

export function sum(a, b) {
    return a + b
}


export function imggg(ele, url) {
    const element = document.createElement('img')
    const imgtag = element.setAttribute('src', url)
    return ele.innerHTML = `
        <img src="${url}">
    `
}


console.log(testimg)

testimg('.aa')