const collide = ({ x: ax, y: ay, radius: ar }, { x: bx, y: by, radius: br }) =>
  Math.abs(Math.hypot(ax - bx, ay - by)) < ar + br

const update = ({ snakes, food: { pieces } }) => {
  snakes.forEach(snake => {
    pieces.forEach(piece => {
      if (collide(snake, piece)) {
        snake.events.push('ate')
        piece.events.push('eaten')
      }
    })
  })
}

export default { update }
