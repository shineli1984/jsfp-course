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

export default Either