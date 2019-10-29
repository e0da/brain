const SNAKE_COLOR = '#e0dede'
const FOOD_COLOR = '#65bd60'

const init = ({ width, height }) => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  return ctx
}

const drawCircle = (ctx, x, y, radius, color) => {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()
}

const drawSnake = (ctx, alpha) => snake => {
  const x = snake.x * alpha + snake.prev.x * (1 - alpha)
  const y = snake.y * alpha + snake.prev.y * (1 - alpha)
  drawCircle(ctx, x, y, snake.radius, SNAKE_COLOR)
  snake.tail.forEach(link => {
    drawCircle(ctx, link.x, link.y, snake.radius, SNAKE_COLOR)
  })
}

const drawFood = ctx => ({ x, y, radius }) => {
  drawCircle(ctx, x, y, radius, FOOD_COLOR)
}

const draw = state => {
  const { alpha, ctx, width, height, snakes, food } = state
  ctx.clearRect(0, 0, width, height)
  snakes.forEach(drawSnake(ctx, alpha))
  food.pieces.forEach(drawFood(ctx))
}

export default { init, draw }
