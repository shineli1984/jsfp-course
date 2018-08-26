import {compose, map} from 'ramda'
import Either from '../week1/either'
import {tagged} from 'daggy'

const EitherT = function(M) {
  const EitherT = tagged('EitherT', ['run']);

  EitherT.lift = function(m) {
    return compose(EitherT, map(Either.Right))(m)
  };

  // MonadState
  if (M.get) {
    EitherT.get = EitherT.lift(M.get)
  }

  if (M.put) {
    EitherT.put = EitherT.lift(M.put)
  }

  EitherT.prototype.fold = function(f, g) {
    return this.run.chain((o) => M.of(o.fold(f, g)));
  };
  EitherT.of = function(x) {
    return EitherT(M.of(Either.Right(x)));
  };
  EitherT.prototype.swap = function() {
    return EitherT(
      this.run.map(e =>
        e.fold(
          (l) => Either.Right(l),
          (r) => Either.Left(r)
        )
      )
    )
  };
  EitherT.prototype.chain = function(f) {
    return EitherT(this.run.chain((o) => {
      return o.fold(
        (a) => M.of(Either.Left(a)),
        (a) => f(a).run
      );
    }));
  };
  EitherT.prototype.map = function(f) {
    return this.chain((a) => EitherT.of(f(a)));
  };
  EitherT.prototype.ap = function(a) {
    return this.chain((f) => a.map(f));
  };
  return EitherT;
};

export default EitherT