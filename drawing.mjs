const WEEM_COLOR = '#e0dede'
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

const drawWeem = (ctx, alpha) => weem => {
  const x = weem.x * alpha + weem.prev.x * (1 - alpha)
  const y = weem.y * alpha + weem.prev.y * (1 - alpha)
  drawCircle(ctx, x, y, weem.radius, WEEM_COLOR)
  weem.tail.forEach(link => {
    drawCircle(ctx, link.x, link.y, weem.radius, WEEM_COLOR)
  })
}

const drawFood = ctx => ({ x, y, radius }) => {
  drawCircle(ctx, x, y, radius, FOOD_COLOR)
}

const draw = state => {
  const { alpha, ctx, width, height, weems, food } = state
  ctx.clearRect(0, 0, width, height)
  weems.forEach(drawWeem(ctx, alpha))
  food.pieces.forEach(drawFood(ctx))
}

export default { init, draw }
