/*
 * @Description: 背景类
 * @Author: xiaoqi
 * @Date: 2020-05-08 10:58:29
 * @LastEditTime: 2020-05-19 18:49:12
 * @LastEditors: xiaoqi
 */
import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 1900
const BG_HEIGHT = 750
// 放大/缩小 比例
const PROPORTION = (screenHeight / BG_HEIGHT)

// 计算具体图片宽度裁剪尺寸
let BG_SWIDTH = (BG_HEIGHT / screenHeight) * screenWidth

let databus = new DataBus()

export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.left = 0
    // 跑道总长度
    databus.totalLen = PROPORTION * BG_WIDTH

    this.render(ctx)
  }

  updated() {
    // console.log(this.left)
    // 如果人物移动到中间，则移动背景
    if (!databus.playerEnd && (!databus.isBackgroundEnd) && databus.isPlayerCenter) {
      this.left += databus.clickSpeed * 2
    }
    // 如果右边已经到底，则停止移动背景
    // 这里需要注意边界判断，由于背景大小和屏幕大小不同，因此会有放缩
    // 因此这里背景绘制 每往后推 1px,实际换算后只是一半(以iphone 6/7/8 375*667为例)
    // -5 是因为预留一点背景
    if (this.left * PROPORTION + screenWidth >= BG_WIDTH * PROPORTION - 5) {
      databus.isBackgroundEnd = true
    }
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      this.left,
      0,
      BG_SWIDTH,
      this.height,
      0,
      0,
      screenWidth,
      screenHeight
    )
  }
}