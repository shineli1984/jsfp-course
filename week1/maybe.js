import {identity, always, prop} from 'ramda'
import daggy from 'daggy'

const Maybe = daggy.taggedSum('Maybe', {
  Just: ['x'],
  Nothing: []
})

Maybe.prototype.map = function(f) {
  return this.cata({
    Just: x => Maybe.Just(f(x)),
    Nothing: () => this
  })
}

Maybe.prototype.getOrElse = function(defaultValue) {
  return this.cata({
    Nothing: always(defaultValue),
    Just: identity
  })
}

Maybe.prototype.reduce = function(reducer, init) {
  return this.cata({
    Nothing: always(init),
    Just: x => reducer(init, x)
  })
}

Maybe.fromNullable = function(x) {
  if (x === null || x === undefined) {
    return Maybe.Nothing
  }

  return Maybe.Just(x)
}

Maybe.prototype.chain = function(ka) {
  return this.cata({
    Nothing: () => Maybe.Nothing,
    Just: ka
  })
}

Maybe.prototype.ap = function(m) {
  return this.cata({
    Nothing: () => Maybe.Nothing,
    Just: f => m.map(f)
  })
}

Maybe.of = Maybe.Just

export default Maybe

// const n = Maybe.Nothing.map(x => x + 1)
// Maybe.Nothing.is(n) // true
// Maybe.Just(1).map(x => x + 1) // Just(2)
// Maybe.getOrElse(2)

// data.maybe folktale js

/**
 * import {prop} from 'ramda'
 *
 * // string -> object -> Maybe(value)
 * key => compose(
 *   Maybe.fromNullable,
 *   prop(key)
 * )
 *
 * path, find ...
 *
 * // checkout sanctuary js
 */
