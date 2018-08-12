import Writer from './writer'
import {adjust, concat, compose, composeK, always} from 'ramda'

export const add1 = a => a + 1
export const multipleBy2 = a => a * 2
export const divideBy3 = a => a / 3

// it's easy to compose the above:
compose(
  divideBy3,
  add1,
  multipleBy2
)

// when we want to log, this is NOT the way to do it:
// const add1WithLog = a => console.log('adding 1 to a: ', a) || add1(a)
// Instead, add message to the return value:
const add1WithLog = a =>
  [add1(a), `${a} addBy1\n`]

const multipleBy2WithLog = a =>
  [multipleBy2(a), `${a} multipleBy2\n`]

const divideBy3WithLog = a =>
  [divideBy3(a), `${a} divideBy3\n`]

// how do we compose the above?
// Option1:
const operationsWithLog = compose(
  ([a, logMessage]) => adjust(
    concat(logMessage),
    1,
    divideBy3WithLog(a)
  ),
  ([a, logMessage]) => adjust(
    concat(logMessage),
    1,
    add1WithLog(a)
  ),
  multipleBy2WithLog
)

console.log('Options 2', operationsWithLog(1).toString())

// What happened above can be broken down into the following parts:
// 1. calling of function like add1WithLog, which returns a tuple([] with 2 elements here)
// 2. concat log message onto the first element of the tuple
// clearly we can write utility function for the part that deconstruct the input
// and concat log message. However, we already have Reader as a convenience
// to express this kind of pattern. Hence, the "Option 2" below:

// Option 2
// First, we need recognise that we don't have to use string for logging. Array works
// as well. As matter of fact, any Moniod is a good fit here.
// a Writer requires a dependency to indicate what kind of Monoid to use:

// This is to make array a monoid
Array.empty = function() {
  return []
}
// getting a Writer depends on Array as Monoid
const W = Writer(Array)

// then we turn functions:
//   divideBy3,
//   add1,
//   multipleBy2
// to output a writer instead.
// That is to turn Int -> Int to Int -> Writer Int
const multipleBy2WithWriter = a =>
  W
    .of(a)
    .tell(`${a} multipleBy2`)
    .map(always(multipleBy2(a)))

const add1WithWriter = a =>
  W
    .of(a)
    .tell(`${a} add1`)
    .map(always(add1(a)))

const divideBy3WithWriter = a =>
  W
    .of(a)
    .tell(`${a} divideBy3`)
    .map(always(divideBy3(a)))

const operationsWithWriter = composeK(
  divideBy3WithWriter,
  add1WithWriter,
  multipleBy2WithWriter
)

console.log('Option 2: ', operationsWithWriter(1).run().toString())