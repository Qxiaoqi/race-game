/*
 * @Description: 玩家类
 * @Author: xiaoqi
 * @Date: 2020-05-08 19:09:51
 * @LastEditTime: 2020-05-17 18:40:57
 * @LastEditors: xiaoqi
 */
import Person from '../base/person'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量
const PLAYER_IMG_SRC = 'images/stand.png'

const PLAYER_WIDTH = 160
const PLAYER_HEIGHT = 160

// 中间位置
const DISX = screenWidth / 2 - (PLAYER_WIDTH / 2)


let databus = new DataBus()

export default class Player extends Person {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    this.init(databus.playerPos, screenHeight - this.height)
    this.initPlayerAnimation()
  }

  updated() {
    if (!databus.playerEnd) {
      // console.log(databus.clickSpeed)
      // 加上行进距离
      databus.playerDistance += databus.clickSpeed
      // console.log(databus.playerDistance, databus.clickSpeed)
      // 如果人物还没有在屏幕正中间,或者背景已经到了尽头,则向右绘制
      if (this.x <= DISX || databus.isBackgroundEnd && this.x <= screenWidth - PLAYER_WIDTH) {
        this.x += databus.clickSpeed
        // 每次更新人物当前渲染坐标
        databus.playerPos = this.x
      } else {
        databus.isPlayerCenter = true
      }
    }
  }

  // 预定义玩家动画
  initPlayerAnimation() {
    const WALK_IMG_PREFIX = 'images/walk'
    const WALK_IMG_COUNT = 8

    const RUN_IMG_PREFIX = 'images/run'
    const RUN_IMG_COUNT = 8

    this.initPersonAnimation(WALK_IMG_PREFIX, WALK_IMG_COUNT, RUN_IMG_PREFIX, RUN_IMG_COUNT)
  }
}