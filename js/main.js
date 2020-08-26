/*
 * @Description: Main启动函数
 * @Author: xiaoqi
 * @Date: 2020-05-07 10:06:29
 * @LastEditTime: 2020-05-30 15:57:15
 * @LastEditors: xiaoqi
 */
import Menu from './runtime/menu'
import BackGround from './runtime/background'
import Player from './player/index'
import Enemy from './npc/enemy'
import GameInfo from './runtime/gameinfo'
import DataBus from './databus'

const screenWidth = window.innerWidth
let ctx = canvas.getContext('2d')
let databus = new DataBus()

export default class Main {
  constructor() {
    // 维护当前 requestAnimationFrame 的 id
    this.aniId = 0

    // 维护主菜单 requestAnimationFrame 的 id
    this.menuAniId = 0

    // 统计点击次数，以便计算点击频率
    this.clickCount = 0

    this.initMenu()

    // 初始化游戏
    // this.restart()
  }

  // 初始化主菜单
  initMenu() {
    console.log('initMenu')
    this.menu = Menu.getInstance(ctx)
    this.bindMenuLoop = this.menuLoop.bind(this)

    this.menuAniId = window.requestAnimationFrame(
      this.bindMenuLoop
    )
  }

  // 主菜单渲染动画
  menuLoop() {
    // console.log('menuLoop')
    if (databus.isMainMenu) {
      this.menu.updated()
      this.menu.render(ctx)
  
      // 传入下一次浏览器重绘前的回调函数
      this.menuAniId = window.requestAnimationFrame(
        this.bindMenuLoop
      )
    }
    else {
      // 已经不在主菜单，删除动画
      window.cancelAnimationFrame(this.menuAniId)
      // console.log(11)

      if (databus.isGameStart)
        this.restart()
    }
  }

  // 重新开始游戏
  restart() {
    // console.log('restart')
    // 初始化全局状态
    databus.reset()

    // 每次游戏开始，都要将透明度置1
    ctx.globalAlpha = 1

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.enemy = new Enemy(ctx)
    this.gameinfo = new GameInfo()

    // 将 loop的 this指向变为 当前的 Main
    this.bindLoop = this.loop.bind(this)
    // 判断是否绑定监听结束事件
    this.hasEndEventBind = false

    // 初始化监听点击屏幕事件
    this.initEvent()

    // 清除上一局动画
    window.cancelAnimationFrame(this.aniId)
    // 清除上一局的监听结束点击事件
    canvas.removeEventListener('touchstart', this.touchEndHandler)

    // 绘制第一帧
    this.aniId = window.requestAnimationFrame(
      this.bindLoop
    )
  }

  // 绑定点击监听
  initEvent() {
    // console.log('initEvent')
    this.clickStatisticsHandler = this.clickStatistics.bind(this)
    // 监听点击事件
    canvas.addEventListener('touchstart', this.clickStatisticsHandler)
  }

  // 统计点击数量
  clickStatistics(e) {
    e.preventDefault()

    // 统计点击频率
    this.clickCount++
  }

  // 计算点击速度
  calculationSpeed() {
    if (databus.frame % 64 === 0) {
      // console.log(this.clickCount)
      // 计算速度 赋值
      databus.clickSpeed = this.clickCount / 5
      // databus.clickSpeed = this.clickCount
      // console.log(databus.clickSpeed)
      // 让动画播放
      // 这里要调整,令频率和动画播放相等
      this.player.playAnimation(databus.clickSpeed)

      // 然后清 0
      this.clickCount = 0

      // 然后获取对手速度
      databus.enemySpeed = Math.random() * (2.5 - 0.5) + 0.5
      // databus.enemySpeed = 5
      // 让对手动画播放
      this.enemy.playAnimation(databus.enemySpeed)
    }
  }

  // 判断玩家到达，并且判断游戏结果
  isGameOver() {
    // console.log(this.player.x)
    // let player = this.player
    // if (player.x >= screenWidth - player.width) {
    if (databus.playerDistance + 160 >= databus.totalLen) {
      // 玩家到达终点
      databus.playerEnd = true
      if (databus.isWin === -1 && databus.enemyEnd) {
        // 对手先到达终点
        databus.isWin = false
      } else if (databus.isWin === -1 && !databus.enemyEnd) {
        databus.isWin = true
      }
      // 清除点击屏幕计算点击次数的函数
      canvas.removeEventListener('touchstart', this.clickStatisticsHandler)
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEndEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    // console.log(e)

    let restartArea = this.gameinfo.restartBtnArea
    let backBtnArea = this.gameinfo.backBtnArea

    // 点击重新开始按钮
    if (x >= restartArea.startX
        && x <= restartArea.endX
        && y >= restartArea.startY
        && y <= restartArea.endY)
      this.restart()

    // 点击返回主页按钮
    if (x >= backBtnArea.startX
        && x <= backBtnArea.endX
        && y >= backBtnArea.startY
        && y <= backBtnArea.endY) {
      // console.log(11)
      // 修改 databus变量
      databus.isMainMenu = true
      databus.isGameStart = false
      // 清除监听当前 点击事件
      canvas.removeEventListener('touchstart', this.touchEndHandler)
      // 清除上一局动画
      window.cancelAnimationFrame(this.aniId)
      // 初始化菜单
      this.initMenu()
      // 初始化菜单页面监听事件
      this.menu.initEvent()
    }
  }

  // 位置更新
  update() {
    // console.log('update')
    // 判断游戏结束
    this.isGameOver()

    // 背景位置更新
    this.bg.updated()

    // 计算点击速率
    this.calculationSpeed()

    // 玩家更新
    this.player.updated()
    // 对手更新
    this.enemy.updated()
  }

  // 渲染
  render() {
    // console.log('render')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    this.bg.render(ctx)

    // 绘制对手
    this.enemy.render(ctx, databus.enemyEnd)
    // 绘制 player玩家
    this.player.render(ctx, databus.playerEnd)

    // 游戏结束
    if (databus.playerEnd && databus.enemyEnd) {
      // console.log(databus.isWin)
      let result = databus.isWin === true ? '你赢了' : '你输了'
      this.gameinfo.renderGameOver(ctx, result)

      if (!this.hasEndEventBind) {
        this.hasEndEventBind = true
        this.touchEndHandler = this.touchEndEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchEndHandler)
      }
    }
  }

  // 实现游戏帧循环
  // 内容：帧递增、更新物体位置、渲染此时物体
  loop() {
    databus.frame++
    
    this.update()
    this.render()

    // 传入下一次浏览器重绘前的回调函数
    this.aniId = window.requestAnimationFrame(
      this.bindLoop
    )
  }
}