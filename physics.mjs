import {
  LENGTH_MIN as SNAKE_LENGTH_MIN,
  GROWTH_INCREMENT as SNAKE_GROWTH_INCREMENT,
} from './snakes.mjs'
import { now } from './util.mjs'

const collide = ({ x: ax, y: ay, radius: ar }, { x: bx, y: by, radius: br }) =>
  Math.abs(Math.hypot(ax - bx, ay - by)) < ar + br

const update = ({ snakes, events, food: { pieces } }) => {
  snakes.forEach(snake => {
    pieces.forEach(piece => {
      if (collide(snake, piece)) {
        snake.events.push({ type: 'ate' })
        piece.events.push({ type: 'eaten' })
        events.push({ type: 'score', amount: SNAKE_GROWTH_INCREMENT })
      }
    })
    snake.tail.slice(SNAKE_LENGTH_MIN).forEach((segment, index) => {
      if (collide(snake, segment)) {
        snake.events.push({ type: 'bitten', segment })
        const amount = -(snake.tail.length - index) * 1.2
        events.push({ type: 'score', amount, unique: true })
      }
    })
  })
}

export default { update }
