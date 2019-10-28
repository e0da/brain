const init = (width, height) => {
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
}

const draw = state => {
  const { alpha, ctx, snakes } = state
  snakes.forEach(drawSnake(ctx, alpha))
}

export default { init, draw }
