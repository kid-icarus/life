/* eslint-env node, mocha */
import { assert } from 'chai'
import move from '../public/js/move'

describe('move', () => {
  it('should kill a cell with more than 3 neighbors', () => {
    let testBoard = [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    let expected = [
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    assert.deepEqual(move(testBoard), expected)
  })

  it('should kill an alive cell that has less than 2 neighbors', () => {
    let testBoard = [
      [1, 1, 0, 1, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    let expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    assert.deepEqual(move(testBoard), expected)
  })

  it('should keep a living cell alive if it has exactly 2 neighbors', () => {
    let testBoard = [
      [1, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    let expected = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    assert.deepEqual(move(testBoard), expected)
  })

  it('should keep a living cell alive if it has exactly 3 neighbors', () => {
    let testBoard = [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    let expected = [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    assert.deepEqual(move(testBoard), expected)
  })

  it('should birth a dead cell that has exactly 3 neighbors', () => {
    let testBoard = [
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    let expected = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    assert.deepEqual(move(testBoard), expected)
  })
})
