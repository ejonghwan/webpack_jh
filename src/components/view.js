import aa from '../images/aa.jpeg'

export function testimg(ele) {
    return document.querySelector(ele).innerHTML = `
        <img src="${aa}" />
    `
}