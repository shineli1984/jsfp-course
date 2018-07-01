import {compose, map, path, prop, sequence, chain} from 'ramda'
import P from './promise'
import Maybe from './maybe'

require('isomorphic-fetch');

const getPokemon = key => new P(
  resolve => {
    fetch(`http://pokeapi.co/api/v2/pokemon/${key}/`).then(a => a.json()).then(resolve)
  })

const safePath = p => compose(
  Maybe.fromNullable,
  path(p)
)

const safeProp = p => compose(
  Maybe.fromNullable,
  prop(p)
)

const getMoveNames = compose(
  map(map(map(safePath(['move', 'name'])))),
  map(safeProp('moves')),
)

const getPokemonMoveNames = compose(
  map(chain(sequence(Maybe.of))),
  getMoveNames,
  getPokemon
)

getPokemonMoveNames(1).fork(a => console.log(a))