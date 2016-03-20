/* eslint-env node, mocha */
import { assert } from 'chai'
import createBoard from '../public/js/board'

describe('board', () => {
  it('should return an x by x board', () => {
    let testBoard = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    assert.deepEqual(createBoard(5), testBoard)
  })

  it('should throw an error if no board size is defined', () => {
    assert.throws(() => createBoard(), Error)
  })
})
