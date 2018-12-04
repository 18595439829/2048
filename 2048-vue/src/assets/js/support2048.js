import main from './main2048'
import 'jquery'
export default {
  getPosTop(i, j) {
    return 20 + i * 120
  },

  getPosLeft(i, j) {
    return 20 + j * 120
  },

  getNumberBackgroundColor(number) {
    switch (number) {
      case 2:
        return '#eee4da'
        break
      case 4:
        return '#eee4da'
        break
      case 8:
        return '#f26179'
        break
      case 16:
        return '#f59563'
        break
      case 32:
        return '#f67c5f'
        break
      case 64:
        return '#f65e36'
        break
      case 128:
        return '#edcf72'
        break
      case 256:
        return '#edcc61'
        break
      case 512:
        return '#9c0'
        break
      case 1024:
        return '#3365a5'
        break
      case 2048:
        return '#09c'
        break
      case 4096:
        return '#a6bc'
        break
      case 8192:
        return '#93c'
        break
    }
    return 'black'
  },

  getNumberColor(number) {
    if (number <= 4) {
      return '#776e65'
    }
    return 'white'
  },

  getScore() {
    document.getElementById('score').innerHTML = main.data.score
  },

  //在随机生成数字的时候判断16宫格中是否还有空间
  nospace(board) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) if (board[i][j] == 0) return false
    return true
  },

  //实现功能判断
  canMoveLeft(board) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (board[i][j] != 0 && j != 0)
          if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
            return true

    return false
  },

  canMoveRight(board) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (board[i][j] != 0 && j != 3)
          if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
            return true

    return false
  },

  canMoveUp(board) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (board[i][j] != 0 && i != 0)
          if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
            return true
    return false
  },

  canMoveDown(board) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (board[i][j] != 0 && i != 3)
          if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
            return true
    return false
  },

  //判断水平方向是否有障碍物
  noBlockHorizontal(row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) if (board[row][i] != 0) return false
    return true
  },

  //判断竖直方向是否有障碍物
  noBlockVertical(col, row1, row2, board) {
    for (let i = row1 + 1; i < row2; i++) if (board[i][col] != 0) return false
    return true
  },
  //最后收尾
  nomove(board) {
    if (
      this.canMoveLeft(board) ||
      this.canMoveRight(board) ||
      this.canMoveUp(board) ||
      this.canMoveDown(board)
    )
      return false
    return true
  }
}
