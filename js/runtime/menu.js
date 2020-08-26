/*
 * @Description: 主菜单类
 * @Author: xiaoqi
 * @Date: 2020-05-19 16:38:02
 * @LastEditTime: 2020-05-30 15:52:47
 * @LastEditors: xiaoqi
 */ 
import Sprite from '../base/sprite'
import Button from '../base/button'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 背景图片
const MENU_IMG_SRC = 'images/menu.jpg'
const MENU_WIDTH = 1334
const MENU_HEIGHT = 1500
// 放大/缩小 比例
const PROPORTION = (screenWidth / MENU_WIDTH)
// 计算具体一个屏幕大小的图片高度
let BG_SHEIGHT = (MENU_WIDTH / screenWidth) * screenHeight

// 标题图片
const TITLE_IMG_SRC = 'images/title.png'
const TITLE_WIDTH = 667
const TITLE_HEIGHT = 188

// 对战电脑按钮
const COMPUTER_IMG_SRC = 'images/computer_button.png'
const COMPUTER_WIDTH = 250
const COMPUTER_HEIGHT = 40

// 对战玩家按钮
const PLAYER_IMG_SRC = 'images/player_button.png'
const PLAYER_WIDTH = 250
const PLAYER_HEIGHT = 40

// 帮助按钮
const HELP_IMG_SRC = 'images/help_button.png'
const HELP_WIDTH = 250
const HELP_HEIGHT = 40

let databus = new DataBus()


export default class Menu extends Sprite{
  constructor(ctx) {
    super(MENU_IMG_SRC, MENU_WIDTH, MENU_HEIGHT)

    this.instance = null

    // 图片移动的 y轴坐标
    this.top = 0

    // 图片是否到达底部
    this.isMoveEnd = false

    // 初始化标题
    this.initTitle()

    // 初始化按钮
    this.initButton()

    // 渲染页面
    this.render(ctx)

    // 初始化监听事件
    this.initEvent()
  }

  // 静态方法，单例模式
  static getInstance(ctx) {
    if (!this.instance) {
      this.instance = new Menu(ctx)
    }
    return this.instance
  }

  initEvent() {
    this.bindTap = this.tap.bind(this)
    // 监听点击事件
    canvas.addEventListener('touchstart', this.bindTap)
  }

  tap(e) {
    // console.log(e.touches[0].clientX)
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    // console.log(x, y)
    if (this.btnComputer.isTapped(x, y)) {
      console.log('对战电脑')
      // 修改 databus变量
      databus.isMainMenu = false
      databus.isGameStart = true
      // 移除按钮监听事件
      canvas.removeEventListener('touchstart', this.bindTap)
    }
    else if (this.btnPlayer.isTapped(x, y)) {
      console.log('对战玩家')
    }
    else if (this.btnHelp.isTapped(x, y)) {
      console.log('帮助页面')
    }
  }

  // 初始化标题
  initTitle() {
    this.title = new Sprite(
      TITLE_IMG_SRC,
      TITLE_WIDTH,
      TITLE_HEIGHT,
      screenWidth / 2 - 334,
    )
  }

  // 初始化菜单按钮
  initButton() {
    // 对战电脑按钮
    this.btnComputer = new Button(
      COMPUTER_IMG_SRC,
      COMPUTER_WIDTH,
      COMPUTER_HEIGHT,
      screenWidth / 2 - 125,
      screenHeight / 2 - 20
    )

    // 对战玩家按钮
    this.btnPlayer = new Button(
      PLAYER_IMG_SRC,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      screenWidth / 2 - 125,
      screenHeight / 2 + 40
    )

    // 帮助按钮
    this.btnHelp = new Button(
      HELP_IMG_SRC,
      HELP_WIDTH,
      HELP_HEIGHT,
      screenWidth / 2 - 125,
      screenHeight / 2 + 100
    )
  }

  updated() {
    // console.log('updated')
    if (this.top + BG_SHEIGHT <= MENU_HEIGHT - 10) {
      // 主菜单背景还没移动到底部，继续移动
      this.top += 2
    } else {
      this.isMoveEnd = true
    }

  }

  render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // console.log('render')
    // 如果不在主菜单页面，则直接跳过渲染
    if (!databus.isMainMenu)
      return

    // 背景
    ctx.drawImage(
      this.img,
      0,
      this.top,
      this.width,
      BG_SHEIGHT,
      0,
      0,
      screenWidth,
      screenHeight
    )

    if (this.isMoveEnd) {
      // 如果到达底部，则将标题、按钮显示
      this.title.fadeIn(ctx)

      this.btnComputer.isShow = true
      this.btnComputer.drawToCanvas(ctx)
      this.btnPlayer.isShow = true
      this.btnPlayer.drawToCanvas(ctx)
      this.btnHelp.isShow = true
      this.btnHelp.drawToCanvas(ctx)
    }
  }
}