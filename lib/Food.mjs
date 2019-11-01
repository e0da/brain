import { handleEvents, now } from './util.mjs'

export const RADIUS = 5
const MAX = 5
const COOLDOWN = 2000
const PROBABILITY = 0.08 // Probability each non-cooldown frame a food will appear

const randomLocation = ({ width, height }) => {
  const x = Math.random() * width
  const y = Math.random() * height
  return { x, y }
}

const add = ({ width, height, food }) => {
  const { x, y } = randomLocation({ width, height })
  const piece = {
    x,
    y,
    radius: RADIUS,
    events: [],
    eaten: false,
  }
  food.pieces.push(piece)
  food.cooldown = now()
}

const init = ({ width, height }) => {
  const food = {
    cooldown: 0,
    pieces: [],
  }
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
  food.pieces.forEach((piece, index) => {
    handleEvents(piece, ({ type }) => {
      switch (type) {
        case 'eaten':
          piece.eaten = true
          break
        default:
      }
    })
    if (piece.eaten) {
      food.pieces.splice(index, 1)
    }
  })
}

export default { init, update }
