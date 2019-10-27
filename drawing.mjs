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

const drawSnake = ctx => snake => {
  drawCircle(ctx, snake.x, snake.y, snake.radius)
}

const draw = state => {
  const { ctx, snakes } = state
  snakes.forEach(drawSnake(ctx))
}

export default { init, draw }
