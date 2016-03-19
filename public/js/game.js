import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import h from 'virtual-dom/h'
import patch from 'virtual-dom/patch'
import cloneDeep from 'lodash.clonedeep'

class Game {
  constructor (size, id) {
    this.size = size
    this.id = id
    this.boardWrapper = document.getElementById(id)
    this.newBoard()

    this.tree = this.renderBoard()
    this.rootNode = createElement(this.tree)
    this.boardWrapper.appendChild(this.rootNode)

    this.shuffleBtn = document.getElementById('shuffle')
    this.playBtn = document.getElementById('play')
    this.pauseBtn = document.getElementById('pause')
    this.moveBtn = document.getElementById('move')


    this.shuffleBtn.addEventListener('click', this.shuffle.bind(this))
    this.playBtn.addEventListener('click', this.play.bind(this))
    this.pauseBtn.addEventListener('click', this.pause.bind(this))

    this.moveBtn.addEventListener('click', () => {
      this.move()
      this.render()
    })
  }

  newBoard () {
    this.board = []
    this.nextBoard = []
    for (let i = 0; i < this.size; i++) {
      this.board[i] = []
      this.nextBoard[i] = []
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = 0
        this.nextBoard[i][j] = 0
      }
    }
  }

  toggleCell (e) {
    let row = e.target.dataset.row
    let col = e.target.dataset.col
    this.board[row][col] = !this.board[row][col]
    e.target.className = 'cell ' + (this.board[row][col] ? 'alive' : 'dead')
  }

  play () {
    if (this.interval) return
    this.interval = window.requestAnimationFrame(this.sync.bind(this))
  }

  sync (timestamp) {
    this.move()
    this.render()
    if (this.interval) {
      window.requestAnimationFrame(this.sync.bind(this))
    }
  }

  pause () {
    window.cancelAnimationFrame(this.interval)
    this.interval = undefined
  }

  shuffle () {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = []
      this.nextBoard[i] = []
      for(let j = 0; j < this.size; j++) {
        this.board[i].push(Math.floor(Math.random() * 10 % 2))
        this.nextBoard[i].push(0)
      }
    }
    this.render()
  }

  clearNewBoard () {
    this.nextBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        this.nextBoard[i][j] = 0
      })
    })
  }

  move () {
    this.clearNewBoard()
    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        let neighbors
        if (i === 0) {
          if (j === 0) {
            neighbors = [this.board[0][1], this.board[1][1], this.board[1][0]]
          } else if (j === this.size - 1) {
            neighbors = [this.board[0][this.size - 2], this.board[1][this.size - 2], this.board[1][this.size - 1]]
          } else {
            neighbors = [
              this.board[0][j - 1],
              this.board[1][j - 1],
              this.board[1][j],
              this.board[0][j + 1],
              this.board[1][j + 1]
            ]
          }
        } else if (i === this.size - 1) {
          if (j === 0) {
            neighbors = [
              this.board[this.size - 2][0],
              this.board[this.size - 2][1],
              this.board[this.size - 1][1]
            ]
          } else if (j === this.size - 1) {
            neighbors = [
              this.board[this.size - 1][this.size - 2],
              this.board[this.size - 2][this.size - 2],
              this.board[this.size - 2][this.size - 1]
            ]
          } else {
            neighbors = [
              this.board[i][j - 1],
              this.board[i][j + 1],
              this.board[i - 1][j - 1],
              this.board[i - 1][j],
              this.board[i - 1][j + 1],
            ]
          }
        } else if (j === 0) {
          neighbors = [
            this.board[i - 1][0],
            this.board[i - 1][1],
            this.board[i][1],
            this.board[i + 1][0],
            this.board[i + 1][1]
          ]
        } else if (j === this.size - 1) {
          neighbors = [
            this.board[i - 1][this.size - 1],
            this.board[i - 1][this.size - 2],
            this.board[i][this.size - 2],
            this.board[i + 1][this.size - 1],
            this.board[i + 1][this.size - 2]
          ]
        } else {
          neighbors = [
            this.board[i - 1][j - 1],
            this.board[i - 1][j],
            this.board[i - 1][j + 1],
            this.board[i][j - 1],
            this.board[i][j + 1],
            this.board[i + 1][j - 1],
            this.board[i + 1][j],
            this.board[i + 1][j + 1]
          ]
        }

        const neighborCount = neighbors.reduce((p, k) => p + k, 0)

        if (cell) {
          if (neighborCount < 2 || neighborCount > 3) {
            this.nextBoard[i][j] = 0
          } else if (neighborCount === 2 || neighborCount === 3) {
            this.nextBoard[i][j] = 1
          }
        } else {
          if (neighborCount === 3) {
            this.nextBoard[i][j] = 1
          } else {
            this.nextBoard[i][j] = 0
          }
        }
      })
    })
    this.board = cloneDeep(this.nextBoard)
  }

  render () {
    let newTree = this.renderBoard()
    let patches = diff(this.tree, newTree)
    this.rootNode = patch(this.rootNode, patches)
    this.tree = newTree
  }

  renderBoard () {
    return h('#game-board', {
      style: {
        width: this.size * 10 + 'px',
        height: this.size * 10 + 'px'
      }
    }, this.renderCells())
  }

  renderCells () {
    return this.board.map((row, i) => row.map((cell, j) => {
      return h('div', {
        className: 'cell ' + (cell ? 'alive' : 'dead'),
      })
    }))
  }
}

export default Game
