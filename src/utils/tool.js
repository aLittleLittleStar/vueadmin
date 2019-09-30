import { Message } from 'element-ui'
// 弹出框的函数
export function showMessage(type, text) {
  Message({
    type: type,
    message: text,
    showClose: true,
    duration: 2000
  })
}