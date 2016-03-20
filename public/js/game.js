import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import h from 'virtual-dom/h'
import patch from 'virtual-dom/patch'
import cloneDeep from 'lodash.clonedeep'

import createBoard from './board'
import move from './move'

class Game {
  constructor (size, id) {
    this.size = size
    this.id = id
    this.board = createBoard(size, true)

    this.boardWrapper = document.getElementById(id)
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
      this.board = move(this.board)
      this.render()
    })
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
    this.board = move(this.board)
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
    this.board = createBoard(this.size, true)
    this.render()
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
    let colors = [
      'pastel-lime', 'pastel-blue', 'pastel-pink', 'pastel-medium-pink', 'pastel-dark-pink'
    ]
    return this.board.map((row, i) => row.map((cell, j) => {
      return h('div', {
        className: 'cell ' + (cell ? colors[i % 5] : 'dead')
      })
    }))
  }
}

export default Game
