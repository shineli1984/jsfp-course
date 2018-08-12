// this is a very simple version to explore future values. Fluture js maybe a better alternative in production

import daggy from 'daggy'

const Promise = daggy.tagged('Promise', ['fork'])

Promise.prototype.map = function(f) {
  const promise = this
  return new Promise((resolve) =>
    promise.fork((a) =>
      resolve(f(a))
    )
  )
}

Promise.of = function(x) {
  return new Promise(function(resolve) {
    return resolve(x)
  })
}

Promise.prototype.ap = function(p) {
  let f = null
  let y = null
  const promise = this

  return new Promise(resolve => {
    promise.fork(fn => {
      f = fn
      if (y) {
        resolve(f(y))
      }
    })

    p.fork(a => {
      y = a
      if (f) {
        resolve(f(y))
      }
    })
  })
}

export default Promise
