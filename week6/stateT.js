import {Tuple2} from 'fantasy-tuples'
import daggy from 'daggy'

const StateT = function(M) {
  const StateT = daggy.tagged('StateT', ['run']);
  StateT.lift = function(m) {
    return StateT(function(b) {
      return m.map(function(c) {
        return Tuple2(c, b);
      });
    });
  };
  StateT.of = function(a) {
    return StateT(function(b) {
      return M.of(Tuple2(a, b));
    });
  };
  StateT.prototype.chain = function(f) {
    const state = this;
    return StateT(function(s) {
      const result = state.run(s);
      return result.chain(function(t) {
        return f(t._1).run(t._2);
      });
    });
  };
  StateT.get = StateT(function(s) {
    return M.of(Tuple2(s, s));
  });
  StateT.modify = function(f) {
    return StateT(function(s) {
      return M.of(Tuple2(null, f(s)));
    });
  };
  StateT.put = function(s) {
    return StateT.modify(function(a) {
      return s;
    });
  };
  StateT.prototype.evalState = function(s) {
    return this.run(s).map(function(t) {
      return t._1;
    });
  };
  StateT.prototype.exec = function(s) {
    return this.run(s).map(function(t) {
      return t._2;
    });
  };
  StateT.prototype.map = function(f) {
    return this.chain(function(a) {
      return StateT.of(f(a));
    });
  };
  StateT.prototype.ap = function(a) {
    return this.chain(function(f) {
      return a.map(f);
    });
  };
  return StateT;
};

export default StateT