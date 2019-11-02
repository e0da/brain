import { empty, handleEvents, randomPoint, times } from './util.mjs'

const RADIUS = 10
const MAX_EXITS = 2

const add = ({ width, height, exits }) => {
  const { x, y } = randomPoint({ width, height })
  const exit = {
    x,
    y,
    radius: RADIUS,
    events: [],
  }
  exits.exits.push(exit)
}

const init = () => {
  return {
    exits: [],
    events: [],
  }
  return exits
}

const update = ({ width, height, exits }) => {
  if (exits.exits.length < MAX_EXITS) {
    add({ width, height, exits })
  }
  handleEvents(exits, ({ type }) => {
    switch (type) {
      case 'reset':
        empty(exits.exits)
        break
      default:
    }
  })
}

const Exit = { init, update }

export default Exit
