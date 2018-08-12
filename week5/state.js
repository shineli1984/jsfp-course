import daggy from 'daggy'
import {always} from 'ramda'

const {Tuple2} = require('fantasy-tuples');

const State = daggy.tagged(State, ['run']);

// Methods
State.of = (a) => {
  return State((b) => Tuple2(a, b));
};

State.prototype.chain = function(f) {
  return State((s) => {
    const result = this.run(s);
    return f(result._1).run(result._2);
  });
};

State.get = State((s) => Tuple2(s, s));

State.modify = (f) => {
  return State((s) => Tuple2(null, f(s)));
};

State.put = (s) => {
  return State.modify(always(s));
};

State.prototype.evalState = function(s) {
  return this.run(s)._1;
};

State.prototype.exec = function(s) {
  return this.run(s)._2;
};

// Derived
State.prototype.map = function(f) {
  return this.chain((a) => State.of(f(a)));
};

State.prototype.ap = function(a) {
  return this.chain((f) => a.map(f));
};

export default State