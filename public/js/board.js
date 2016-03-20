let size

const createBoard = (boardSize, random) => {
  let board = []
  size = boardSize

  if (!boardSize) {
    throw new Error('Missing argument: board must have size')
  }

  for (let i = 0; i < size; i++) {
    board[i] = []
    for (let j = 0; j < size; j++) {
      board[i][j] = getCell(random)
    }
  }
  return board
}

const getCell = (random) => {
  if (!random) return 0

  return Math.floor(Math.random() * 10 % 2)
}

export default createBoard
