export default (cellType, i, j) => {
  switch (cellType) {
    case 'first-first':
      return [{
        row: 0,
        col: 1
      }, {
        row: 1,
        col: 0
      }, {
        row: 1,
        col: 1
      }]

    case 'first-middle':
      return [{
        row: 0,
        col: j - 1
      }, {
        row: 0,
        col: j + 1
      }, {
        row: 1,
        col: j - 1
      }, {
        row: 1,
        col: j
      }, {
        row: 1,
        col: j + 1
      }]

    case 'first-last':
      return [{
        row: 0,
        col: j - 1
      }, {
        row: 1,
        col: j - 2
      }, {
        row: 1,
        col: j - 1
      }]

    case 'middle-first':
      return [{
        row: i - 1,
        col: 0
      }, {
        row: i - 1,
        col: 1
      }, {
        row: i,
        col: 1
      }, {
        row: i + 1,
        col: 1
      }, {
        row: i + 1,
        col: 0
      }, {
        row: i + 1,
        col: 1
      }]

    case 'middle-middle':
      return [{
        row: i - 1,
        col: j - 1
      }, {
        row: i - 1,
        col: j
      }, {
        row: i - 1,
        col: j + 1
      }, {
        row: i,
        col: j - 1
      }, {
        row: i,
        col: j + 1
      }, {
        row: i + 1,
        col: j - 1
      }, {
        row: i + 1,
        col: j
      }, {
        row: i + 1,
        col: j + 1
      }]

    case 'middle-last':
      return [{
        row: i - 1,
        col: j - 1
      }, {
        row: i - 1,
        col: j
      }, {
        row: i,
        col: j - 1
      }, {
        row: i + 1,
        col: j - 1
      }, {
        row: i + 1,
        col: j
      }, {
        row: i + 1,
        col: j + 1
      }]

    case 'last-first':
      return [{
        row: i - 1,
        col: j
      }, {
        row: i - 1,
        col: j + 1
      }, {
        row: i,
        col: j + 1
      }]

    case 'last-middle':
      return [{
        row: i - 1,
        col: j - 1
      }, {
        row: i - 1,
        col: j
      }, {
        row: i - 1,
        col: j + 1
      }, {
        row: i,
        col: j - 1
      }, {
        row: i,
        col: j + 1
      }]

    case 'last-last':
      return [{
        row: i - 1,
        col: j - 1
      }, {
        row: i - 1,
        col: j
      }, {
        row: i,
        col: j - 1
      }]
  }
}
