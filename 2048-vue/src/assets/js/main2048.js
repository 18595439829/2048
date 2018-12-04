// 引入其他两个工具函数js文件
import show from './showanimation2048'
import support from './support2048'
import $ from 'jquery'
import 'jquery'
export default {
  data: {
    board: new Array(),
    added: new Array(),
    score: 0,
    top: 240
  },

  newgame() {
    //初始化棋盘格
    this.init()
    //在随机两个各自声称的数字
    this.generateOneNumber()
    this.generateOneNumber()
    this.gameStart()
  },

  init() {
    this.data.score = 0
    document.getElementById('score').innerHTML = this.data.score
    $('#gameover').css('display', 'none')
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let gridCell = $('#grid-cell-' + i + '-' + j)
        gridCell.css('top', support.getPosTop(i, j))
        gridCell.css('left', support.getPosLeft(i, j))
      }
    }

    for (let i = 0; i < 4; i++) {
      //初始化格子数组
      this.data.board[i] = new Array()
      for (let j = 0; j < 4; j++) {
        this.data.board[i][j] = 0
      }
    }

    for (let i = 0; i < 4; i++) {
      //初始化判定合并的数组
      this.data.added[i] = new Array()
      for (let j = 0; j < 4; j++) {
        this.data.added[i][j] = 0
      }
    }

    this.updateBoardView() //通知前端对board二位数组进行设定。
  },

  updateBoardView() {
    //更新数组的前端样式
    $('.number-cell').remove()
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        $('#grid-container').append(
          '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>'
        )
        let theNumberCell = $('#number-cell-' + i + '-' + j)
        if (this.data.board[i][j] == 0) {
          theNumberCell.css('width', '0px')
          theNumberCell.css('height', '0px')
          theNumberCell.css('top', support.getPosTop(i, j))
          theNumberCell.css('left', support.getPosLeft(i, j))
        } else {
          theNumberCell.css('width', '100px')
          theNumberCell.css('hegiht', '100px')
          theNumberCell.css('top', support.getPosTop(i, j))
          theNumberCell.css('left', support.getPosLeft(i, j))
          //NumberCell覆盖
          theNumberCell.css(
            'background-color',
            support.getNumberBackgroundColor(this.data.board[i][j])
          ) //返回背景色
          theNumberCell.css(
            'color',
            support.getNumberColor(this.data.board[i][j])
          ) //返回前景色
          theNumberCell.text(this.data.board[i][j])
        }
      }
    }
  },

  generateOneNumber() {
    //生成随机的格子
    if (support.nospace(this.data.board)) return false

    //随机一个位置
    let randx = parseInt(Math.floor(Math.random() * 4))
    let randy = parseInt(Math.floor(Math.random() * 4))
    while (true) {
      if (this.data.board[randx][randy] == 0) break
      randx = parseInt(Math.floor(Math.random() * 4))
      randy = parseInt(Math.floor(Math.random() * 4))
    }
    //随机一个数字
    let randNumber = Math.random() < 0.5 ? 2 : 4
    //在随机位置显示随机数字
    this.data.board[randx][randy] = randNumber
    show.showNumberWithAnimation(randx, randy, randNumber)
    return true
  },

  //事件响应循环
  gameStart() {
    $(document).keydown((event) => {
      switch (event.keyCode) {
        case 37: //left
          if (this.moveLeft()) {
            //setTimeout("generateOneNumber()",210);
            support.getScore()
            this.generateOneNumber() //每次新增一个数字就可能出现游戏结束
            setTimeout(this.isgameover(), 400) //300毫秒
          }
          break
        case 38: //up
          if (this.moveUp()) {
            support.getScore()
            this.generateOneNumber() //每次新增一个数字就可能出现游戏结束
            setTimeout(this.isgameover(), 400)
          }
          break
        case 39: //right
          if (this.moveRight()) {
            support.getScore()
            this.generateOneNumber() //每次新增一个数字就可能出现游戏结束
            setTimeout(this.isgameover(), 400)
          }
          break
        case 40: //down
          if (this.moveDown()) {
            support.getScore()
            this.generateOneNumber() //每次新增一个数字就可能出现游戏结束
            setTimeout(this.isgameover(), 400)
          }
          break
      }
    })
  },

  isgameover() {
    if (support.nospace(this.data.board) && support.nomove(this.data.board))
      this.gameover()
  },

  gameover() {
    $('#gameover').css('display', 'block')
  },

  isaddedArray() {
    //将判断能否合并的数组值置为0
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.data.added[i][j] = 0
      }
    }
  },
  moveLeft() {
    //更多地细节信息
    //判断格子是否能够向左移动
    if (!support.canMoveLeft(this.data.board)) return false

    this.isaddedArray()
    //真正的moveLeft函数//标准
    for (let i = 0; i < 4; i++)
      for (let j = 1; j < 4; j++) {
        //第一列的数字不可能向左移动
        if (this.data.board[i][j] != 0) {
          //(i,j)左侧的元素
          for (let k = 0; k < j; k++) {
            //落脚位置的是否为空 && 中间没有障碍物
            if (
              this.data.board[i][k] == 0 &&
              support.noBlockHorizontal(i, k, j, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, i, k)
              this.data.board[i][k] = this.data.board[i][j]
              this.data.board[i][j] = 0
              continue
            }
            //落脚位置的数字和本来的数字相等 && 中间没有障碍物
            else if (
              this.data.board[i][k] == this.data.board[i][j] &&
              support.noBlockHorizontal(i, k, j, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, i, k)
              //add
              if (this.data.added[i][k] != 0) {
                //目标落脚点是否完成过合并
                this.data.board[i][k + 1] = this.data.board[i][j]
                this.data.board[i][j] = 0
              } else {
                this.data.board[i][k] += this.data.board[i][j]
                this.data.board[i][j] = 0
                this.data.added[i][k] = 1
                this.data.score += this.data.board[i][k]
              }
              continue
            }
          }
        }
      }
    setTimeout(this.updateBoardView(), 200)
    return true
  },

  moveRight() {
    //更多地细节信息
    //判断格子是否能够向右移动
    if (!support.canMoveRight(this.data.board)) return false

    this.isaddedArray()
    //真正的moveRight函数//标准
    for (let i = 0; i < 4; i++)
      for (let j = 2; j >= 0; j--) {
        //最后一列的数字不可能向右移动
        if (this.data.board[i][j] != 0) {
          //(i,j)右侧的元素
          for (let k = 3; k > j; k--) {
            //落脚位置的是否为空 && 中间没有障碍物
            if (
              this.data.board[i][k] == 0 &&
              support.noBlockHorizontal(i, j, k, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, i, k)
              this.data.board[i][k] = this.data.board[i][j]
              this.data.board[i][j] = 0
              continue
            }
            //落脚位置的数字和本来的数字相等 && 中间没有障碍物
            else if (
              this.data.board[i][k] == this.data.board[i][j] &&
              support.noBlockHorizontal(i, j, k, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, i, k)
              //add
              if (this.data.added[i][k] != 0) {
                this.data.board[i][k - 1] = this.data.board[i][j]
                this.data.board[i][j] = 0
              } else {
                this.data.board[i][k] += this.data.board[i][j]
                this.data.board[i][j] = 0
                this.data.added[i][k] = 1
                this.data.score += this.data.board[i][k]
              }
              continue
            }
          }
        }
      }
    setTimeout(this.updateBoardView(), 200)
    return true
  },

  moveUp() {
    //更多地细节信息
    //判断格子是否能够向上移动
    if (!support.canMoveUp(this.data.board)) return false

    this.isaddedArray()
    //真正的moveUp函数//标准
    for (let j = 0; j < 4; j++)
      for (let i = 1; i < 4; i++) {
        //第一行的数字不可能向上移动
        if (this.data.board[i][j] != 0) {
          //(i,j)上面的元素
          for (let k = 0; k < i; k++) {
            //落脚位置的是否为空 && 中间没有障碍物
            if (
              this.data.board[k][j] == 0 &&
              support.noBlockVertical(j, k, i, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, k, j)
              this.data.board[k][j] = this.data.board[i][j]
              this.data.board[i][j] = 0
              continue
            }
            //落脚位置的数字和本来的数字相等 && 中间没有障碍物
            else if (
              this.data.board[k][j] == this.data.board[i][j] &&
              support.noBlockVertical(j, k, i, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, k, j)
              //add
              if (this.data.added[k][j] != 0) {
                this.data.board[k + 1][j] = this.data.board[i][j]
                this.data.board[i][j] = 0
              } else {
                this.data.board[k][j] += this.data.board[i][j]
                this.data.board[i][j] = 0
                this.data.added[k][j] = 1
                this.data.score += this.data.board[k][j]
              }
              continue
            }
          }
        }
      }
    setTimeout(this.updateBoardView(), 200)
    return true
  },

  moveDown() {
    //更多地细节信息
    //判断格子是否能够向下移动
    if (!support.canMoveDown(this.data.board)) return false

    this.isaddedArray()
    //真正的moveDown函数//标准
    for (let j = 0; j < 4; j++)
      for (let i = 2; i >= 0; i--) {
        //最后一行的数字不可能向下移动
        if (this.data.board[i][j] != 0) {
          //(i,j)上面的元素
          for (let k = 3; k > i; k--) {
            //落脚位置的是否为空 && 中间没有障碍物
            if (
              this.data.board[k][j] == 0 &&
              support.noBlockVertical(j, i, k, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, k, j)
              this.data.board[k][j] = this.data.board[i][j]
              this.data.board[i][j] = 0
              continue
            }
            //落脚位置的数字和本来的数字相等 && 中间没有障碍物
            else if (
              this.data.board[k][j] == this.data.board[i][j] &&
              support.noBlockVertical(j, i, k, this.data.board)
            ) {
              //move
              show.showMoveAnimation(i, j, k, j)
              //add
              if (this.data.added[k][j] != 0) {
                this.data.board[k - 1][j] = this.data.board[i][j]
                this.data.board[i][j] = 0
              } else {
                this.data.board[k][j] += this.data.board[i][j]
                this.data.board[i][j] = 0
                this.data.added[k][j] = 1
                this.data.score += this.data.board[k][j]
              }
              continue
            }
          }
        }
      }
    setTimeout(this.updateBoardView(), 200)
    return true
  }
}
