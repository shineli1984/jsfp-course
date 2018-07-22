import {compose, map, path, prop, sequence, chain} from 'ramda'
import Maybe from './week1/maybe'
import fetchJson from './week2/fetchJson'

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