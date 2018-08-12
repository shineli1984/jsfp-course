import State from './state'
import {always, compose, composeK, assoc, prop, path} from 'ramda'

// Here is to combine the idea of writer and reader to produce a running state
// through a series of computations:
const add = a => e =>
  a + e

const multiply = a => e =>
  a * e

const divide = a => e =>
  a / e

const addWithState = a =>
  State
    .get
    .chain(
      state => {
        const result = add(a)(state.addBy)
        return State.put(
          assoc(
            'added',
            result,
            state
          )
        ).map(always(result))
      }
    )

const multiplyWithState = a =>
  State
    .get
    .chain(
      state => {
        const result = multiply(a)(state.multiplyBy)
        return State.put(
          assoc(
            'multiplied',
            result,
            state
          )
        ).map(always(result))
      }
    )

const divideWithState = a =>
  State
    .get
    .chain(
      state => {
        const result = divide(a)(state.divideBy)
        return State.put(
          assoc(
            'devided',
            result,
            state
          )
        ).map(always(result))
      }
    )

const operationsWithState = composeK(
  divideWithState,
  addWithState,
  multiplyWithState
)(1)

console.log(
  operationsWithState.run({
    multiplyBy: 2,
    addBy: 1,
    divideBy: 3
  })
)