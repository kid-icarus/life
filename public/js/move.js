import findNeighbors from './neighbors'

const move = (board) => board.map((row, i) => row.map((cell, j) => {
  let size = board.length

  const getCellType = () => [i, j].map((position) => {
    // Check column position
    if (position === 0) return 'first'
    if (position === size - 1) return 'last'
    return 'middle'
  }).join('-')

  let neighbors = findNeighbors(getCellType(i, j), i, j)
  const neighborCount = neighbors.reduce((p, k) => p + board[k.row][k.col], 0)

  if (cell) {
    if (neighborCount < 2 || neighborCount > 3) return 0
    if (neighborCount === 2 || neighborCount === 3) return 1
  }
  if (neighborCount === 3) return 1
  return 0
}))

export default move
