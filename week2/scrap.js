import {compose, map, path, prop, sequence, chain} from 'ramda'
import P from './promise'
import Maybe from '../week1/maybe'
import Either from '../week1/either'

require('isomorphic-fetch');

const fetchJson = url => new P(
  resolve => {
    fetch(url)
      .then(response => {
        if (response.status > 399) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(compose(
        resolve,
        Either.Right
      ))
      .catch(compose(
        resolve,
        Either.Left
      ))
  })

const getPokemon = key =>
  fetchJson(`http://pokeapi.co/api/v2/pokemon/${key}/`)

const safePath = p => compose(
  Maybe.fromNullable,
  path(p)
)

const safeProp = p => compose(
  Maybe.fromNullable,
  prop(p)
)

const getMoveNames = compose(
  map(map(safePath(['move', 'name']))),
  safeProp('moves'),
)

const getPokemonMoveNames = compose(
  map(map(chain(sequence(Maybe.of)))),
  map(map(getMoveNames)),
  getPokemon
)

getPokemonMoveNames(1).fork(a => console.log(a))