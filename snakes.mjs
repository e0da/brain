const GROWTH_INCREMENT = 5
const LENGTH_MAX = 150
const LENGTH_MIN = 15
const RADIUS = 10
const SPEED = 5
const SPEED_INCREMENT = 0.1
const SPEED_MAX = 10
const SPEED_MIN = 1
const TURN_RATE = 0.1

const add = state => {
  const { width, height } = state
  const [initialX, initialY] = [width / 2, height / 2]
  const snake = {
    x: initialX,
    y: initialY,
    length: LENGTH_MIN,
    rotation: -Math.PI / 2,
    radius: RADIUS,
    speed: 1,
    prev: {
      x: initialX,
      y: initialY,
    },
  }
  state.snakes.push(snake)
}

const move = ({ width, height, input: { left, right, up, down } }) => snake => {
  if (left) snake.rotation -= TURN_RATE
  if (right) snake.rotation += TURN_RATE
  snake.rotation %= 2 * Math.PI
  if (snake.rotation < 0) snake.rotation += 2 * Math.PI

  if (up) snake.speed += SPEED_INCREMENT
  if (down) snake.speed -= SPEED_INCREMENT
  if (snake.speed < SPEED_MIN) snake.speed = SPEED_MIN

  const dx = snake.speed * Math.cos(snake.rotation)
  const dy = snake.speed * Math.sin(snake.rotation)
  snake.prev.x = snake.x
  snake.prev.y = snake.y
  snake.x += dx
  snake.y += dy

  snake.x = Math.max(0, snake.x)
  snake.x = Math.min(snake.x, width)
  snake.y = Math.max(0, snake.y)
  snake.y = Math.min(snake.y, height)
}

const update = state => {
  const { snakes } = state
  if (snakes.length === 0) add(state)
  snakes.forEach(move(state))
}

export default { update }
