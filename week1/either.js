import daggy from 'daggy'

const Either = daggy.taggedSum('Either', {
  Left: ['l'],
  Right: ['r']
})

Either.prototype.map = function(f) {
  return this.cata({
    Left: Either.Left,
    Right: r => Either.Right(f(r))
  })
}

Either.of = Either.Right

Either.prototype.ap = function(e) {
  return this.cata({
    Left: Either.Left,
    Right: f => e.map(f)
  })
}

export default Either