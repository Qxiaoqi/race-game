/*
 * @Description: 游戏基础精灵类
 * @Author: xiaoqi
 * @Date: 2020-05-08 10:58:50
 * @LastEditTime: 2020-05-30 15:46:50
 * @LastEditors: xiaoqi
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y

    // 透明度
    this.ga = 0.0

    this.visible = true
  }

  fadeIn(ctx) {
    if (this.ga >= 1) {
      ctx.globalAlpha = 1
      // 直接渲染
      this.drawToCanvas(ctx)
    }
    else {
      ctx.globalAlpha = this.ga
      this.drawToCanvas(ctx)
      this.ga += 0.01
    }
  }

  // 将精灵图绘制在canvas上
  drawToCanvas(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}