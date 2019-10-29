import { LENGTH_MIN as SNAKE_LENGTH_MIN } from './snakes.mjs'

const collide = ({ x: ax, y: ay, radius: ar }, { x: bx, y: by, radius: br }) =>
  Math.abs(Math.hypot(ax - bx, ay - by)) < ar + br

const update = ({ snakes, food: { pieces } }) => {
  snakes.forEach(snake => {
    pieces.forEach(piece => {
      if (collide(snake, piece)) {
        snake.events.push({ type: 'ate' })
        piece.events.push({ type: 'eaten' })
      }
    })
    snake.tail.slice(SNAKE_LENGTH_MIN).forEach(segment => {
      if (collide(snake, segment)) {
        snake.events.push({ type: 'bitten', segment })
      }
    })
  })
}

export default { update }
