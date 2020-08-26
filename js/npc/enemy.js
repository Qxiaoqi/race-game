/*
 * @Description: 敌人类
 * @Author: xiaoqi
 * @Date: 2020-05-17 15:11:58
 * @LastEditTime: 2020-05-19 16:18:53
 * @LastEditors: xiaoqi
 */ 
import Person from '../base/person'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 敌人相关常量
const Enemy_IMG_SRC = 'images/stand.png'

const Enemy_WIDTH = 160
const Enemy_HEIGHT = 160

let databus = new DataBus()

export default class Enemy extends Person {
  constructor() {
    super(Enemy_IMG_SRC, Enemy_WIDTH, Enemy_HEIGHT)

    // 是否到达终点
    this.isOver = false

    this.init(-20, screenHeight - this.height - 35)
    this.initEnemyAnimation()
  }

  // 对手需要计算和玩家的相对位置
  updated() {
    if (!this.isOver) {
      if (databus.enemyDistance + Enemy_WIDTH >= databus.totalLen) {
        this.isOver = true
        databus.enemyEnd = true
      }
      
      // 对手行进距离
      databus.enemyDistance += databus.enemySpeed

    }
    // 和玩家相对距离
    let dis = databus.enemyDistance - databus.playerDistance + 20
    this.x = databus.playerPos + dis

    // console.log(dis, databus.enemyDistance, databus.playerDistance, databus.playerPos, this.x)

    // console.log(this.x)

    // if (this.x <= -160 || this.x >= screenWidth) {
    //   console.log('隐藏')
    //   // 超出屏幕范围，将其隐藏
    //   this.visible = false
    // } else {
    //   this.visible = true
    // }
  }

  // 预定义敌人动画
  initEnemyAnimation() {
    const WALK_IMG_PREFIX = 'images/walk'
    const WALK_IMG_COUNT = 8

    const RUN_IMG_PREFIX = 'images/run'
    const RUN_IMG_COUNT = 8

    this.initPersonAnimation(WALK_IMG_PREFIX, WALK_IMG_COUNT, RUN_IMG_PREFIX, RUN_IMG_COUNT)
  }
}