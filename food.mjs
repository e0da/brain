import { now } from './util.mjs'

const MAX = 5
const COOLDOWN = 5000
const PROBABILITY = 0.01 // Probability each non-cooldown frame a food will appear

const randomLocation = ({ width, height }) => {
  const x = Math.random() * width
  const y = Math.random() * height
  return { x, y }
}

const add = ({ width, height, food }) => {
  console.log('adding')
  const piece = randomLocation({ width, height })
  food.pieces.push(piece)
  food.cooldown = now()
}

const init = ({ width, height }) => {
  const food = {
    cooldown: 0,
    pieces: [],
  }
  add({ width, height, food })
  return food
}

const cooldownOK = ({ cooldown }) => now() - cooldown > COOLDOWN

const update = ({ width, height, food }) => {
  if (
    food.pieces.length < MAX &&
    cooldownOK(food) &&
    Math.random() <= PROBABILITY
  ) {
    add({ width, height, food })
  }
}

export default { init, update }
