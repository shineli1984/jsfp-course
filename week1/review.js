import {
	compose,
	curry,
	path,
	join,
	flip,
	__,
	append,
  evolve,
  applySpec,
  length,
  concat
} from 'ramda'
import assert from 'assert';
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

const getContentUnderB = compose(
	join(' '),
	path(['a', 'b'])
)

assert.ok(getContentUnderB(data1) === 'content under b')

// ----------------
const f1 = (a, b, c) => a * b + c
const f1p = compose(
	flip
)(f1)

// flipping first and second arguments:
assert.ok(f1(1, 2, 3) === f1p(2, 1, 3))

// ----------------
const f2 = curry((a, b, c) => a * b + c)
const f2p = (a, b, c) => f2(a, __, b)(c);
// flipping second and third arguments
assert.ok(f2(1, 2, 3) === f2p(1, 3, 2))

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

const append2ToC3ToE = evolve({
	a: {
		b: {
			c: append(2)
		}
	},
	d: {
		e: append(3)
	}
})
// assert.ok(append2ToC3ToE(data2) === {
// 	a: {
// 		b: {
// 			c: [1, 2]
// 		}
// 	},
// 	d: {
// 		e: [2, 3]
// 	}
// })

// --------------

const stats = applySpec({
  totalCharacters: (a, b) => length(concat(a,b)),
  arg1: {
    positive: (a, _) => a>0
  },
  arg2: {
    positive: (_, b) => b>0
  }
})

console.log(stats('10', '-2'))

assert.ok(stats('10', '-2') ===
{
  totalCharacters: 4,
  arg1: {
    positive: true
  },
  arg2: {
    positive: false
  }
}
)

// touch on pointfree
