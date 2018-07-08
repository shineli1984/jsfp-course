import {always, identity} from 'ramda'
import daggy from 'daggy'

const Reader = daggy.tagged('Promise', ['run'])

Reader.ask = Reader(identity)
Reader.of = a => Reader(always(a))

Reader.prototype.map = function(f) {
  return Reader(e =>
    f(this.run(e))
  )
}

Reader.prototype.chain = function(f) {
  return Reader((e) => f(this.run(e)).run(e));
};

export default Reader