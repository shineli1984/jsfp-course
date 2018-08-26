import {compose, chain, map, take} from 'ramda'
import EitherT from './eitherT'
import Promise from '../week2/promise'
import State from './state'
import {getPokemon, safeProp} from '../week2/scrap'
import fetchJson from '../week2/fetchJson'

// // Example with Promise and Either
// // pokemon1 :: Promise (Either Error Pokemon)
// const pokemon = getPokemon(1)
//
// // when we want to map over value of type Pokemon
// // we need to first map the Promise then map the Either
// const moves1 = map(map(compose(
//   map(take(5)),
//   safeProp('moves')
// )))(pokemon)
//
// moves1.fork(e => {
//   e.cata({
//     Left: x => console.log('Error: ', x.message),
//     Right: x => {
//       x.cata({
//         Just: x => console.log('First 5 moves: ', x),
//         Nothing: _ => console.log('No moves')
//       })
//     }
//   })
// })


// // Example with State Promise Either
// // AppState :: {url :: string}
// // getPokemon :: Int -> State AppState (Promise (Either Error Pokemon))
// const getPokemon1 = id =>
//   map(
//     ({url}) =>
//       fetchJson(`${url}/${id}/`)
//   )(State.get)
//
// const moves2 = compose(
//   map(map(map(compose(
//     map(take(5)),
//     safeProp('moves')
//   )))),
//   getPokemon1
// )(1)
//
// moves2
//   .run({url: 'http://pokeapi.co/api/v2/pokemon'})
//   ._1
//   .fork(e => {
//     e.cata({
//       Left: x => console.log('Error: ', x.message),
//       Right: x => {
//         x.cata({
//           Just: x => console.log('First 5 moves: ', x),
//           Nothing: _ => console.log('No moves')
//         })
//       }
//     })
//   })


// // The examples above incrementally introduce more and more `map`s
// // The Monad Transform is a popular(but not ideal way) to solve this problem.
// const Mts = EitherT(Promise)
//
// const m = Mts(getPokemon(1))
// const moves3 = m.map(
//     compose(
//       map(take(5)),
//       safeProp('moves')
//     )
//   )
//
// moves3.run.fork(e => {
//   e.cata({
//     Left: x => console.log('Error: ', x.message),
//     Right: x => {
//       x.cata({
//         Just: x => console.log('First 5 moves: ', x),
//         Nothing: _ => console.log('No moves')
//       })
//     }
//   })
// })


// // The `m` above is produced by calling constructor Mts directly.
// // This is because `getPokemon :: Promise (Either Error Pokemon)` has already
// // embedded `Either`.
// // Here we have an example to `lift` a Promise without `Either` embedded
// // to be of type Mts
// const Mts = EitherT(Promise)
// const m = Mts.lift(Promise.of(1))
// m.run.fork(e => {
//   e.cata({
//     Left: e => console.log(e),
//     Right: n => console.log(n)
//   })
// })


// // Because EitherT is also a Applicative so we can use `of` to
// // put a value directly into a `Mts`
// const Mts = EitherT(Promise)
// const m = Mts.of(1)
// m.run.fork(e => {
//   e.cata({
//     Left: e => console.log(e),
//     Right: n => console.log(n)
//   })
// })


// // now we are adding StateT into the mix
// import StateT from './stateT'
// const StateTPromise = StateT(Promise)
// const Mts = EitherT(StateTPromise)
//
// // getPokemon3 :: Int -> StateTPromise AppState (Promise (Either Error Pokemon))
// const getPokemon3 = id =>
//   chain(
//     ({url}) =>
//       StateTPromise.lift(
//         fetchJson(`${url}/${id}/`)
//       )
//   )(StateTPromise.get) // instead of State.get we now have StateTPromise.get. StateT provides methods that State monad has
//
// const moves3 = compose(
//   map(compose( // because we are in Mts, which is the most higher level/layer, we just need a single map here.
//     map(take(5)), // also, please note here we are using exactly the same code to get the first 5 moves
//     safeProp('moves')
//   )),
//   Mts, // again, because Promise (Either Error Pokemon) has a Either at most inside layer, we can use Mts constructor here
//   getPokemon3
// )(1)
//
// moves3
//   .run
//   .run({url: 'http://pokeapi.co/api/v2/pokemon'})
//   // ._1 // because we are use transformer, the tuple is embedded into the inner layer, so we don't need the _1 here
//   .fork(e => {
//     e._1.cata({
//       // please note that when run the transform layers, it's the order when we define the type.
//       // But we after we run the transformer, we now have layers reversed
//       // that is State Either instead of Either State.
//       // This is again because Transformers always reach into the most inner layer of Monad
//       // which means the most outer layer refers to the most inner layer being a particular type.
//       Left: x => console.log('Error: ', x.message),
//       Right: x => {
//         x.cata({
//           Just: x => console.log('First 5 moves: ', x),
//           Nothing: _ => console.log('No moves')
//         })
//       }
//     })
//
//     console.log('state: ', e._2)
//   })