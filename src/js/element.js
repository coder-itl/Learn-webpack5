import '../css/style.css'
import '../css/img.css'

import scImg from '../img/test-img-loader.png'

// 创建元素
const divEl = document.createElement('div')
const divImg = document.createElement('div')

const imgE = document.createElement('img')
imgE.src = scImg

// 添加类
divEl.className = 'title'
divImg.className = 'body-img'

divEl.innerHTML = 'Hello webpack'

document.body.appendChild(divEl)
document.body.appendChild(divImg)

document.body.appendChild(imgE)

const appLength = length
console.log(appLength)
