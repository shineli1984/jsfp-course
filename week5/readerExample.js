import Reader from './reader'
import {__, filter, compose, composeK, equals, find, prop, propEq} from 'ramda'

const data = [
  {id: 1, name: 'John', friends: [2, 3]},
  {id: 2, name: 'Mitch'},
  {id: 3, name: 'Paul'},
]

const findIdEq = compose(
  find,
  equals,
  prop('id')
)

const inList = list => x =>
  compose(
    x => !!x,
    findIdEq(x)
  )(list)

export const databaseConnection = {
  get: id => find(
    propEq('id', id)
  )(data),
  getByIds: compose(
    filter(__, data),
    inList
  )
}

export const getById = conn => id =>
  conn.get(id)

export const getByIds = conn => ids =>
  conn.getByIds(ids)


const user = getById(databaseConnection)(1)
const friends = getByIds(databaseConnection)(user.friends)

// how do we compose the above?
// Option 1:
const getByIdWithConn = getById(databaseConnection)
const getByIdsWithConn = getByIds(databaseConnection)

const getFriendsWithConn = compose(
  getByIdsWithConn,
  prop('friends'),
  getByIdWithConn
)
console.log('Option 1: ', getFriendsWithConn(1))

// Option 2:
// using the reader
const getByIdWithReader = id =>
  Reader
    .ask
    .map(conn =>
      getById(conn)(id)
    )

const getByIdsWithReader = ids =>
  Reader
    .ask
    .map(conn =>
      getByIds(conn)(ids)
    )

const getFriendsById = composeK(
  getByIdsWithReader,
  compose(
    Reader.of,
    prop('friends')
  ),
  getByIdWithReader
)(1)

// run the reader
console.log('Option 2: ',
  getFriendsById.run(databaseConnection)
)