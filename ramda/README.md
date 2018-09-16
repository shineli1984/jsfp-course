# Introduction to Ramda

## What
This repo is a guide for learning FP using Ramda.

## Why
One of the barriers to functional programming in javascript is the lack of skills of using functional utility libs.

### Why Ramda
Comparing to other JavaScript FP utilities, Ramda has a relatively lower cognitive load.
Although there are other libraries that are more powerful and more correct, they suffer from inconsistent implementation and/or usage.
After being proficient of using Ramda, one will be ready to dive into more advanced FP libraries and concepts.

## How
Here is the path to mastering Ramda:
- Arguments order
- Curry
- Fixed concret type
- Fixed number of arguments
- Partial and total functions
- Composition
- How to find the function you need
- Exercises
- Webpack plugin
- Working with typeclass
    - Foldable
    - Functor
    - Applicative
    - Traversable
    - Monads

### Arguments order
Unlike early days Javascript utility libraries such as lodash and underscore,
Ramda function has arguments in reversed order.
```js
import {find} from 'ramda';
find(x => x === 2, [1, 2, 3]);
// _.find taking array first:
_.find([1, 2, 3], x => x === 2);
```

### Curry
```js
import {__, add} from 'ramda';
// The followings are equivalent:
add(1)(2);
add(1, 2);
add(__, 2)(1);
add(1, __)(2);
```

### Fixed concrete type
```js
// The argument of _.get is either an array or string.
_.get({a: {b: 1}}, ['a', 'b']) === _.get({a: {b: 1}}, 'a.b'); // true

// Ramda does not allow this:
import {path} from 'ramda';
path(['a', 'b'], {a: {b: 1}}); // 1
```
By design, Ramda tries to pick a correct Javascript type for its functions'
arguments. For this particular example above, the choice provided by lodash
to accept string, although increase conveniency, suffers from having a low
resolution type for the path. In another word, using dot delimiter string
hides its meaning of path. Whereas, although array is far from perfect choice
here, it at least provides the meaning of segmentation.

### Fixed number of arguments
There is no ambiguity of how many arguments a function can take.
```js
// _.get takes 2 or 3 arguments for extended functionality
_.get({a: {b: 1}}, ['a', 'b', 'c']); // undefined
_.get({a: {b: 1}}, ['a', 'b', 'c'], 3) // 3

// Ramda does this by function composition and other more advanced technique(not in scope for this example):
import {compose, path, defaultTo} from 'ramda';
const pathWithDefault = p => compose(
  defaultTo(3),
  path(p)
)
pathWithDefault(['a', 'b', 'c'])({a: {b: 1}}); // 3
```

### Partial and total functions
In mathematics, partial functions are functions does not map all the value
from its domain. In javascript, we treat functions retuns null or undefined
as partial functions.
```js
import {prop} from 'ramda';
const getA = prop('a'); // getA is a partial function
getA({b: 1}) // === undefined
```
Partial function are a major source of runtime bug. However, at entry level
we will treat them as total functions or provide `null`/`undefined` checking
using `if` or `ternary`. Later on, we will have more advanced techniques
to explicitly express the concept of `there is  nothing` to avoid `null`/
`undefined` related bugs.

### Composition
Is function is the building blocks then composition is the glue.
```js
import {compose, prop, multiply} from 'ramda';
const getATimes2 = compose(
  multiply(2),
  prop('a')
);

getTimes2({a: 4}); // === 8
```

### How to find the function you need
- Go to https://ramdajs.com/docs
- Take a guest in the search bar
- Or type List, Object, Logic, Function or String in the search bar if you suspect the function you need is under one of these categories.

### Exercises
#### Basics
```js
// "function" to "Function"
const titlelize = converge(
  concat,
  [
    compose(
      toUpper,
      head
    ),
    tail
  ]
);

// [{id: 1, score: 90}, {id: 2, score: 40}, {id: 3, score: 80}]
// to [{id: 1, score: 90}, {id: 2, score: 50}, {id: 3, score: 80}]
// given id needs to be matched with 2 then score needs to be increased
// by 10.
const incrementById = (incrementBy, id, data) => adjust(
  add(incrementBy),
  find(propEq('id', id))
);
incrementById(
  10,
  2,
  [{id: 1, score: 90}, {id: 2, score: 40}, {id: 3, score: 80}]
);

// {name: "John", age: 20} to [<div key="name">John</div>, <div key="age">20</div>]
mapObjIndexed(
  (value, key) =>
    <div key={key}>{key}</div>
)

// given:
// const tasks = [
//   {
//     "id": 6441,
//     "name": "Teach me how to fly a drone",
//   },
//   {
//     "id": 289,
//     "name": "Handy man needed"
//   }
// ]
// and:
// const activities = [{taskId: 6441}, {taskId: 289}]
//
// create a function matchTasks, such that
// matchTasks(tasks)(activities) == ["Teach me how to fly a drone", "Handy man needed"]
const matchTasks = tasks =>
  map(compose(
    prop('name'),
    find(__, tasks),
    propEq('id'),
    prop('taskId')
  ))

// given:
// const payload = {payloadString: 20}
// const scores = [{score: 10}, {score: 15}]
// produce:
// [{score: 20}, {score: 10}, {score: 15}]
const prependPayload = scores => compose(
  prepend(__, scores),
  objOf('score'),
  prop('payloadString')
)

// {noise: '/factory/1/noise', temperature: '/factory/1/temperature'}
// to {'/factory/1/noise': [], '/factory/1/temperature': []}
compose(
  zipObj(__, repeat([], 2)),
  values
)


// {connecting: true, connected: false}
// to {connecting: false, connected: true}
evolve({
  connecting: not,
  connected: not,
})

// given {users: [{name: 'john', age: 18}], underAgeCount: 0} and {name: 'Tommy', age: 17}
// produce {users: [{name: 'john', age: 18}, {name: 'Tommy', age: 17}], underAgeCount: 1}
newUser => evolve({
  users: append(newUser),
  underAgeCount: when(
    always(
      lte(
        prop('age', newUser),
        18
      )
    ),
    add(1)
  )
})

// [1, null, undefined, '', [], 2]
// to [1, 2]
reject(either(isEmpty, isNil))
```
