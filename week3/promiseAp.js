import {__, ap, compose, sequence, map} from 'ramda'
import Either from '../week1/either'
import fetchJson from '../week2/fetchJson'

const fetchPokemon1 = fetchJson('http://pokeapi.co/api/v2/pokemon/1/')
const fetchPokemon2 = fetchJson('http://pokeapi.co/api/v2/pokemon/2/')

// fetchPokemon1.map(a => b => [a, b]).ap(fetchPokemon2).fork(r => console.log(r))

const pokemons = compose(
  ap(__, fetchPokemon2),
  map(a => b => [a, b]),
)(fetchPokemon1)

pokemons.map(sequence(Either.of)).fork(r => console.log(r))
