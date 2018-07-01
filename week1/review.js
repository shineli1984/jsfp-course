import {compose, curry} from 'ramda'
/**
 * Review last week's contents: curry & compose through various composition of lambda functions
 */

const data1 = {
  a: {
    b: [
      'content',
      'under',
      'b'
    ]
  }
}

// getContentUnderB(data1) === 'content under b'
const getContentUnderB = compose(
  // ...
)

// ----------------
const f1 = (a, b, c) => a * b + c
const f1p = compose(
  // ...
)(f1)
// flipping first and second arguments:
// f1(1, 2, 3) === f1p(2, 1, 3)


// ----------------
const f2 = curry((a, b, c) => a * b + c)
const f2p = f2(
  // ...
)
// flipping second and third arguments
// f2(1, 2, 3) === f2p(1, 3, 2)

// ----------------
const data2 = {
  a: {
    b: {
      c: [1]
    }
  },
  d: {
    e: [2]
  }
}
// append2ToC3ToE(data2) ===
// {
//   a: {
//     b: {
//       c: [1, 2]
//     }
//   },
//   d: {
//     e: [2, 3]
//   }
// }
//
const append2ToC3ToE = compose(
  // ...
)


// --------------
// stats('10', '-2') ===
// {
//   totalCharacters: 3
//   arg1: {
//     positive: true
//   },
//   arg2: {
//     positive: false
//   }
// }
//
const stats = undefined//..


// touch on pointfree