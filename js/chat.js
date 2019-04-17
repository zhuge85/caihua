/**
 * caihua
 *
 */

// 设置默认打字效果
function Chat() {
  this.dom = document.querySelector('.caihua-word')
  this.body = document.getElementById('caihua')
  this.tx = [
    '欢迎来到我的主页~^*_*^~',
    '如果喜欢就多看下(づ￣3￣)づ',
    '如果看到什么不对的地方(╥╯^╰╥)',
    '记得给我留言哟o(*￣︶￣*)o'
  ]
  this.txcount = this.tx.length
}
Chat.prototype = {
  num: 1,
  row: 0,
  way: 1,
  boxclass: ''
}
Chat.prototype.text = function() {
  if (this.boxclass !== 'caihua-face face-0' + (this.row % 3)) {
    this.body.className = 'caihua-face face-0' + (this.row % 3)
  }
  this.num++
  if (this.num < this.tx[this.row].length) {
    this.dom.innerHTML = this.tx[this.row].substr(0, this.num) + '_'
  } else {
    this.dom.innerHTML = this.tx[this.row].substr(0, this.num)
  }
  if (this.num == this.tx[this.row].length + 50) {
    this.row++
    this.num = 0
    this.row = this.row % this.txcount
  }
}

// 定义初始信息
let menu = document.querySelector('.caihua-menu'),
  menubtn = document.querySelector('.caihua-btn'),
  word = document.querySelector('.caihua-word'),
  main = document.querySelector('.caihua'),
  summon = document.querySelector('.caihua-zhaohuan'),
  hello = '菜花出来陪您玩啦(#^.^#)',
  what = '你想要做什么呢？',
  timer = null,
  oldtime = '2019-04-13',
  singn = 0,
  newarr = {
    显示公告: '为了我们和大家的持续发展，请不要对本站进行任何和谐行为',
    存活时间: `菜花已经和哥哥共同度过了 ${getDays(
      oldtime
    )}天 的人生了哦~ 是不是很棒呢~~`,
    拍打喂食: {
      小饼干: '嗷呜~ 多谢款待 >ω<',
      胡萝卜: '人家又不是小兔子 QwQ, 真好吃~~',
      秋刀鱼: '大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜~',
      胖次: '哇~ 好可爱的胖次~~~',
      淡定红茶: '喝完了，ˊ_>ˋ和我签订契约成为淡定少女吧！'
    },
    挑逗一下: {
      为啥叫菜花呢: '哥哥说在网上看到一个春菜，所以给她找个妹妹 (*¯︶¯*)',
      有男朋友吗: '呜呜！哥哥答应以后给等春菜找呢↖(^ω^)↗'
    },
    传送门: {
      个人博客园: 'http://www.zhujianbo.cn/blog/',
      element: 'http://www.zhujianbo.cn/ele/',
      iview: 'http://www.zhujianbo.cn/iview/',
      'ant desgin': 'http://www.zhujianbo.cn/antui/'
    },
    隐藏菜花: '记得叫我出来玩哦~~'
  }

let chat = new Chat()

// 显示菜花
summon.onclick = function() {
  fadeOut(summon)
  fadeIn(main)
  chat = new Chat()
  chat.body.className = 'caihua-face face-01'
  clearHtml()
  typing(hello, 5000)
}
// 点击 menu hide 触发显示隐藏菜单
menubtn.onclick = function() {
  let disp = menu.style.display || 'none'
  if (timer) clearTimer()
  clearHtml()
  if (disp === 'block') {
    closeMenu()
    startTimer()
  } else {
    chat.num = 0
    chat.body.className = 'caihua-face face-00'
    menu.style.display = 'block'
    let arr = Object.keys(newarr)
    menu.appendChild(creatDom(arr))
    typing(what)
    menubtn.childNodes[0].nodeValue = 'hide'
  }
}
// 点击菜单内容触发效果
menu.onclick = function(e) {
  var menuitem = menu.querySelectorAll('a')
  var e = e || window.event
  var target = e.target || e.srcElement
  for (let i in menuitem) {
    if (target === menuitem[i]) {
      const val = menuitem[i].childNodes[0].nodeValue
      if (timer) clearTimer()
      if (typeof newarr[val] == 'object') {
        menu.innerHTML = ''
        let arr = Object.keys(newarr[val])
        menu.appendChild(creatDom(arr))
      } else if (newarr[val] == undefined) {
        for (let key in newarr) {
          if (typeof newarr[key] == 'object') {
            for (let item in newarr[key]) {
              if (item === val) {
                clearHtml()
                closeMenu()
                switch (item) {
                  case '个人博客园':
                  case 'element':
                  case 'iview':
                  case 'ant desgin':
                    window.open(newarr[key][item], 5000)
                    startTimer()
                    break
                  default:
                    typing(newarr[key][item], 5000)
                }
              }
            }
          }
        }
      } else {
        clearHtml()
        closeMenu()
        switch (val) {
          case '隐藏菜花':
            typing(newarr[val])
            setTimeout(() => {
              menubtn.childNodes[0].nodeValue = 'menu'
              chat = null
              fadeOut(main)
              fadeIn(summon)
            }, 3000)
            break
          case '显示公告':
            typing(newarr[val], 5000)
            chat.body.className = 'caihua-face face-02'
            break
          default:
            typing(newarr[val], 5000)
        }
      }
    }
  }
}
// 选择菜单打字效果
function typing(str, time) {
  let len = str.length
  // 没有显示完时
  if (singn <= len) {
    word.innerHTML = str.substr(0, singn++) + '_'
    timer = setTimeout(() => {
      typing(str, time)
    }, 100)
  } else {
    // 打字效果处理完成时
    clearTimeout(timer)
    // 如果设置时间，结束后开始默认打字效果，没有则清除定时器
    if (time) {
      timer = setTimeout(() => {
        closeMenu()
        startTimer()
      }, time)
    } else {
      timer = null
    }
  }
}
// 生成菜单
function creatDom(arr) {
  let menuFragment = document.createDocumentFragment()
  let length = arr.length
  for (let i = 0; i < length; i++) {
    let a = document.createElement('a')
    let Text = document.createTextNode(arr[i])
    a.appendChild(Text)
    menuFragment.appendChild(a)
  }
  return menuFragment
}
// 设置定时器
function startTimer() {
  timer = setTimeout(() => {
    chat.text()
    startTimer()
  }, 120)
}
// 清除定时器
function clearTimer() {
  clearTimeout(timer)
  timer = null
}
// 清空显示对话并重置归0
function clearHtml() {
  word.innerHTML = ''
  singn = 0
}
// 隐藏菜单并清空
function closeMenu() {
  menubtn.childNodes[0].nodeValue = 'menu'
  menu.style.display = 'none'
  menu.innerHTML = ''
}
// 渐现
function fadeIn(el, display) {
  let a = 0
  el.style.opacity = 0
  el.style.display = display || 'block'
  ;(function fade() {
    if ((a += 1) == 10) {
      a = 10
      el.style.opacity = 1
    } else {
      el.style.opacity = a / 10
      requestAnimationFrame(fade)
    }
  })()
}
// 渐隐
function fadeOut(el) {
  let a = 10
  el.style.opacity = 1
  ;(function fade() {
    if ((a -= 1) == 0) {
      a = 0
      el.style.opacity = 0
      el.style.display = 'none'
    } else {
      el.style.opacity = a / 10
      requestAnimationFrame(fade)
    }
  })()
}
// 计算某个日期和当前天数差的函数，通用   oldtime = '2019-04-13',
function getDays(time) {
  let targetTime = Math.round(new Date(time))
  let currentTime = Math.round(Date.now())
  let offsetTime = Math.abs(currentTime - targetTime)
  return Math.floor(offsetTime / (3600 * 24 * 1e3))
}
