/*
 * @Description: 
 * @Author: xiaoqi
 * @Date: 2020-05-20 10:30:49
 * @LastEditTime: 2020-05-20 11:11:51
 * @LastEditors: xiaoqi
 */ 
import Sprite from './sprite'

export default class Button extends Sprite {
  constructor(imgSrc, width, height, x, y) {
    super(imgSrc, width, height, x, y)

    // 判断按钮是否显示
    this.isShow = false
  }

  // 判断按钮是否点击
  isTapped(x, y) {
    if (this.isShow && x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)) {
      return true
    }
    return false
  }
}