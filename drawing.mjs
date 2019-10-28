const FOOD_RADIUS = 5

const init = ({ width, height }) => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  return ctx
}

const drawCircle = (ctx, x, y, radius) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.stroke()
}

const drawSnake = (ctx, alpha) => snake => {
  const x = snake.x * alpha + snake.prev.x * (1 - alpha)
  const y = snake.y * alpha + snake.prev.y * (1 - alpha)
  drawCircle(ctx, x, y, snake.radius)
  snake.tail.forEach(link => {
    drawCircle(ctx, link.x, link.y, snake.radius)
  })
}

const drawFood = ctx => ({ x, y }) => {
  drawCircle(ctx, x, y, FOOD_RADIUS)
}

const draw = state => {
  const { alpha, ctx, width, height, snakes, food } = state
  ctx.clearRect(0, 0, width, height)
  snakes.forEach(drawSnake(ctx, alpha))
  food.pieces.forEach(drawFood(ctx))
}

export default { init, draw }
