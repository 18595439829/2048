import support from './support2048'
import $ from 'jquery'
import 'jquery'
export default {
  showNumberWithAnimation(i, j, randNumber) {
    //实现随机数字的样式变动

    let numberCell = $('#number-cell-' + i + '-' + j)
    numberCell.css(
      'background-color',
      support.getNumberBackgroundColor(randNumber)
    )
    numberCell.css('color', support.getNumberColor(randNumber))
    numberCell.text(randNumber)

    numberCell.animate(
      {
        width: '100px',
        height: '100px',
        top: support.getPosTop(i, j),
        left: support.getPosLeft(i, j)
      },
      50
    )
  },
  showMoveAnimation(fromx, fromy, tox, toy) {
    //实现移动格子的样式变动
    console.log('实现移动格子的样式变动', fromx, fromy, tox, toy)
    let numberCell = $('#number-cell-' + fromx + '-' + fromy)
    numberCell.animate(
      {
        top: support.getPosTop(tox, toy),
        left: support.getPosLeft(tox, toy)
      },
      2000
    )
    console.log('移动格子的样式变动', numberCell)
  }
}
