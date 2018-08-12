import {always, identity} from 'ramda'
import daggy from 'daggy'

const Reader = daggy.tagged('Reader', ['run'])

Reader.ask = Reader(identity)
Reader.of = a => Reader(always(a))

// map :: Reader e a ~> (a -> b) -> Reader e b
Reader.prototype.map = function(f) {
  return Reader(e =>
    f(this.run(e))
  )
}

// map :: Reader e a ~> (a -> Reader e b) -> Reader e b
Reader.prototype.chain = function(f) {
  return Reader(e =>
    f(this.run(e))
      .run(e));
};

export default Reader