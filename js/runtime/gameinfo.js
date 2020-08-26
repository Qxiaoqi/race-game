/*
 * @Description: 游戏信息类
 * @Author: xiaoqi
 * @Date: 2020-05-11 19:34:11
 * @LastEditTime: 2020-05-17 18:53:43
 * @LastEditors: xiaoqi
 */
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

// let atlas = new Image()
// atlas.src = 'images/Common.png'
let endImg = new Image()
endImg.src = 'images/end.png'
let backImg = new Image()
backImg.src = 'images/back_button.png'
let restartImg = new Image()
restartImg.src = 'images/restart_button.png'


export default class GameInfo {
  // renderGameScore(ctx, score) {
  //   ctx.fillStyle = "#ffffff"
  //   ctx.font      = "20px Arial"

  //   ctx.fillText(
  //     score,
  //     10,
  //     30
  //   )
  // }

  renderGameOver(ctx, result) {
    ctx.drawImage(endImg, screenWidth / 2 - 195, screenHeight / 2 - 130, 390, 260)

    ctx.fillStyle = "#000000"
    ctx.font    = "20px Arial"

    ctx.fillText(
      result,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    // 绘制重新开始按钮
    ctx.drawImage(
      restartImg,
      screenWidth / 2 - 156,
      screenHeight / 2 - 25,
      312, 50
    )

    // 绘制返回主页按钮
    ctx.drawImage(
      backImg,
      screenWidth / 2 - 156,
      screenHeight / 2 - 25 + 70,
      312, 50
    )


    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    // 重开按钮
    this.restartBtnArea = {
      startX: screenWidth / 2 - 156,
      startY: screenHeight / 2 - 25,
      endX  : screenWidth / 2  + 156,
      endY  : screenHeight / 2 + 25
    }

    // 返回主页按钮
    this.backBtnArea = {
      startX: screenWidth / 2 - 156,
      startY: screenHeight / 2 - 25 + 70,
      endX  : screenWidth / 2  + 156,
      endY  : screenHeight / 2 + 25 + 70
    }
  }
}

