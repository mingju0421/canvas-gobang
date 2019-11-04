<template>
  <div class="hello">
    <h1 ref='title' class="title"></h1>
    <canvas id="canvas" @click="chessOnclick"></canvas>
    <div>
      <button @click="restart">重新开始</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      canvas: null,
      cxt: null,
      canvasWidth: 600,
      canvasHeight: 600,
      board: {},
      over: false,
      me: true,
      chressBord: [],
    }
  },
  mounted () {
    this.$refs.title.innerHTML = '五子棋'
    this.initCanvas('#canvas', this.canvasWidth, this.canvasHeight)
    this.drawChessBoard(this.cxt, this.canvasWidth, this.canvasHeight, this.board)
  },
  methods: {
    restart () {
      // this.cxt.clearRect(0, 0, 600, 600)
      this.canvas = null
      this.cxt = null
      this.board = {}
      this.initCanvas('#canvas', this.canvasWidth, this.canvasHeight)
      this.drawChessBoard(this.cxt, this.canvasWidth, this.canvasHeight, this.board)
    },
    // 初始化画布
    initCanvas (DOM, width, height) {
      let canvas = document.querySelector(DOM)
      canvas.width = width
      canvas.height = height
      let cxt = canvas.getContext('2d')
      this.cxt = cxt
      this.canvas = canvas
    },
    // 绘制画板
    drawChessBoard (cxt, width, height, board) {
      let x = width / 15
      let y = height / 15
      let canvasPadding = x / 2
      for (let i = 0; i < 15; i++) {
        cxt.moveTo(canvasPadding + i * x, canvasPadding) // 20为预留的白色边框
        cxt.lineTo(canvasPadding + i * x, this.canvasWidth - canvasPadding)
        cxt.stroke()
        cxt.moveTo(canvasPadding, canvasPadding + i * y)
        cxt.lineTo(this.canvasHeight - canvasPadding, canvasPadding + i * y)
        cxt.stroke()
      }
      for (let i = 0; i < 15; i++) {
        board[i] = {}
        for (let j = 0; j < 15; j++) {
          board[i][j] = 0
        }
      }
    },
    // 我, 下棋
    chessOnclick (e) {
      window.console.log(e.offsetX, e.offsetY)
      if (this.over) {
        // 游戏结束
        return
      }
      let x = e.offsetX
      let y = e.offsetY
      let i = Math.floor(x / 40)
      let j = Math.floor(y / 40)
      if (this.board[i][j] !== 0) return window.console.log('44')
      if (this.me) {
        this.board[i][j] = 1
        this.oneStep(i, j)
      }else {
        this.board[i][j] = 2
        this.oneStep(i, j)
      }
    },
    // 画棋子
    oneStep (i, j) {
      // window.console.log('oneStep')
      let cxt = this.cxt
      cxt.beginPath()
      cxt.arc(20 + i * 40, 20 + j * 40, 17, 0, 2 * Math.PI)  //画圆, X, Y, R, 起始角, 结束角
      cxt. closePath()
      let gradient = cxt.createRadialGradient(20 + i * 40 + 2, 20 + j * 40 - 2,18, 20 + i * 40 + 2, 20 +j * 40 - 2, 0)
      if (this.me) {
        gradient.addColorStop(0, '#0a0a0a')
        gradient.addColorStop(1, '#636766')
      }else {
        gradient.addColorStop(0, '#d1d1d1')
        gradient.addColorStop(1, '#f9f9f9')
      }
      cxt.fillStyle = gradient
      cxt.fill()
      this.win(i, j)
      this.me = !this.me
    },
    win (i, j) {
      let num = this.me ? 1 : 2
      let k = i >= 4 ? i - 4 : 0
      let sum = 0
      // 判断 X 轴
      while (k < (i + 5 > 14 ? 14 : i + 5)) {
        // if (this.board[k][j] === num) sum++
        this.board[k][j] === num ? sum += 1 : sum = 0
        if (sum >= 5) return this.chessOver()
        k++
      }
      k = j >= 4 ? j - 4 : 0
      // 判断 Y 轴
      sum = 0
      while (k < (j + 5 > 14 ? 14 : j + 5)) {
        // if (this.board[i][k] === num) sum++
        this.board[i][k] === num ? sum += 1 : sum = 0
        if (sum >= 5) return this.chessOver()
        k++
      }
      // 判断正斜
      if (14 - i + j >=4 && 14 - j + i >= 4) {
        sum = 0
        let x = i - 4 
        let y = j - 4
        while (x < i + 5) {
          if (x >= 0 && y >= 0 && x <= 14 && y <= 14) {
            // if (this.board[x][y] === num) sum++
            this.board[x][y] === num ? sum += 1 : sum = 0
            if (sum >= 5) return this.chessOver()
          }
          x++
          y++
        }
      }
      // 判断反斜
      if (i + j >=4 && i + j <= 24) {
        sum = 0
        let x = i + 4
        let y = j - 4
        while (x > i - 5) {
          if (x >= 0 && y >= 0 && x <= 14 && y <= 14) {
            // if (this.board[x][y] === num) sum++
            this.board[x][y] === num ? sum += 1 : sum = 0
            if (sum >= 5) return this.chessOver()
          }
          x--
          y++
        }
      }
    },
    chessOver () {
      let win = this.me ? '黑子赢' : '白子赢'
      this.over = true
      this.$refs.title.innerHTML = win
    }
    
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .hello 
    margin auto
    width 600px
    .title
      text-align center
    
</style>
