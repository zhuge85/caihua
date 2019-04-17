/**
 * 拖拽 专为菜花
 * @param {Object} id div的id
 */
function Drag(id) {
  this.oBox = document.getElementById(id)
  this.parent = this.oBox.parentNode
  this.disX = 0
  this.disY = 0
  this.width = 85 //this.parent.clientWidth  开始是隐藏的这里不能获取宽高，手动设置
  this.height = 152 //this.parent.clientHeight

  var _this = this

  this.oBox.onmousedown = function(ev) {
    var e = ev || event
    _this.fnDown(e)
  }
}
//鼠标按下
Drag.prototype.fnDown = function(ev) {
  var oEvent = ev || event
  var body = document.body

  this.disX = oEvent.clientX - this.parent.offsetLeft
  this.disY = oEvent.clientY - this.parent.offsetTop

  body.style.WebkitUserSelect = 'none'
  body.style.MozUserSelect = 'none'
  body.style.OUserSelect = 'none'
  body.style.UserSelect = 'none'

  var _this = this

  document.onmousemove = function(ev) {
    var e = ev || event
    _this.fnMove(e)
  }
  document.onmouseup = function(ev) {
    var e = ev || event
    _this.fnUp(e)
  }
  // document.onmouseout = function() {
  //   _this.fnUp()
  // }
}
//鼠标移动
Drag.prototype.fnMove = function(ev) {
  var oEvent = ev || event
  var w = document.documentElement.clientWidth || document.body.clientWidth
  var h = document.documentElement.clientHeight || document.body.clientHeight

  if (
    oEvent.clientX - this.disX > 0 &&
    oEvent.clientX - this.disX < w - this.width
  )
    this.parent.style.left = oEvent.clientX - this.disX + 'px'
  if (
    oEvent.clientY - this.disY > 0 &&
    oEvent.clientY - this.disY < h - this.height
  )
    this.parent.style.top = oEvent.clientY - this.disY + 'px'
}
//鼠标抬起
Drag.prototype.fnUp = function() {
  var body = document.body
  body.removeAttribute('style')
  body.removeAttribute('style')
  body.removeAttribute('style')
  body.removeAttribute('style')
  document.onmousemove = null
  document.onmouseup = null
}
// 调用方法
// window.onload = function(){
//   var drag = new Drag(id)
// }
