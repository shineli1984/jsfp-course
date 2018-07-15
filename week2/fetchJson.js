require('isomorphic-fetch')
import Either from '../week1/either'
import P from './promise'
import { compose } from 'ramda'

export default url => new P(
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