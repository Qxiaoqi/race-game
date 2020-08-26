/*
 * @Description: 人物类
 * @Author: xiaoqi
 * @Date: 2020-05-17 15:46:39
 * @LastEditTime: 2020-05-30 15:59:21
 * @LastEditors: xiaoqi
 */
import Sprite from './sprite'
import DataBus from '../databus'

let databus = new DataBus()

export default class Person extends Sprite {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height)

  }

  init(x, y) {
    // 初始化人物位置
    this.x = x
    this.y = y

    // 初始化人物帧数
    this.index = -1
    // 初始化人物当前动作
    this.state = 'stand'
    // 初始化人物图片集
    this.animation = {
      walk: [],
      run: []
    }
    // 初始化人物动作
    this.playImg = this.img
  }

  render(ctx, isOver) {
    if (databus.frame % 8 === 0) {
      this.index++
    }

    // 如果是站立 或者游戏结束
    if (this.state === 'stand' || isOver) {
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    // 如果非站立
    else if (this.state === 'walk' || this.state === 'run') {
      ctx.drawImage(
        this.playImg[this.index] || this.img,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  }

  // 渲染图像动作
  playAnimation(speed) {
    this.index = -1

    let imgType
    if (speed === 0) {
      // 站立状态
      this.state = 'stand'
    }
    else if (speed > 0 && speed <= 1.5) {
      // 行走状态
      this.state = 'walk'
      imgType = this.animation['walk']
    }
    else if (speed > 1.5) {
      // 奔跑状态
      this.state = 'run'
      imgType = this.animation['run']
    }
    this.playImg = imgType
  }

  // 预定义人物动画
  initPersonAnimation(walkPrefix, walkCount, runPrefix, runCount) {
    let walkFrames = []
    let runFrames = []

    const WALK_IMG_PREFIX = walkPrefix
    const WALK_IMG_COUNT = walkCount

    const RUN_IMG_PREFIX = runPrefix
    const RUN_IMG_COUNT = runCount

    for (let i = 0; i < WALK_IMG_COUNT; i++) {
      walkFrames.push(WALK_IMG_PREFIX + (i + 1) + '.png')
    }

    for (let i = 0; i < RUN_IMG_COUNT; i++) {
      runFrames.push(RUN_IMG_PREFIX + (i + 1) + '.png')
    }

    // 将动画放入帧图片集
    this.initFrame(walkFrames, 'walk')
    this.initFrame(runFrames, 'run')
  }

  initFrame(imgList, type) {
    if (!this.animation.hasOwnProperty(type)) {
      this.animation[type] = []
    }
    imgList.forEach(imgSrc => {
      let img = new Image()
      img.src = imgSrc
      this.animation[type].push(img)
    })
  }
}