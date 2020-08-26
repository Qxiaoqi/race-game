/*
 * @Description: 全局状态管理器
 * @Author: xiaoqi
 * @Date: 2020-05-07 10:08:57
 * @LastEditTime: 2020-05-19 18:18:36
 * @LastEditors: xiaoqi
 */

let instance

export default class DataBus {
  constructor() {
    if (instance)
      return instance

    instance = this
    
    this.reset()
  }

  // 初始化全局状态管理器
  reset() {
    // 当前帧
    this.frame = 0
    // 玩家是否到达终点
    this.playerEnd = false
    // 对手是否到达终点
    this.enemyEnd = false
    // 点击速度
    this.clickSpeed = 0
    // 对手速度
    this.enemySpeed = 0
    // 玩家行进距离
    this.playerDistance = 0
    // 对手行进距离
    this.enemyDistance = 0
    // 判断人物是否走到中间
    this.isPlayerCenter = false
    // 判断背景是否到头
    this.isBackgroundEnd = false
    // 玩家渲染位置
    this.playerPos = -40
    // 跑道总长度（会根据比例计算）
    this.totalLen = 1900
    // 判断玩家是否获胜
    this.isWin = -1
    // 判断游戏是否开始
    this.isGameStart = false
    // 判断游戏是否是单人模式
    this.isSingleMode = false
    // 判断游戏是否是双人模式
    this.isSingleMode = false
    // 判断是否是帮助页面
    this.ishelpPage = false
    // 判断是否是主菜单页面
    this.isMainMenu = true
  }
}