import { STATES as WEEM_STATES } from './Weems.mjs'

const WEEM_COLOR = '#e0dede'
const FOOD_COLOR = '#65bd60'
const EXIT_COLOR = '#222200'

const init = ({ config: { width, height } }) => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  return ctx
}

const drawCircle = ({ ctx, x, y, radius, color, height }) => {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(x, height - y, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()
}

const drawWeem = ({ ctx, alpha, height }) => weem => {
  const x = weem.x * alpha + weem.prev.x * (1 - alpha)
  const y = weem.y * alpha + weem.prev.y * (1 - alpha)

  if (weem.state === WEEM_STATES.DEFAULT)
    drawCircle({ ctx, x, y, height, radius: weem.radius, color: WEEM_COLOR })
  weem.tail.forEach(link => {
    drawCircle({
      ctx,
      height,
      x: link.x,
      y: link.y,
      radius: weem.radius,
      color: WEEM_COLOR,
    })
  })
}

const drawFood = ({ ctx, height }) => ({ x, y, radius }) => {
  drawCircle({ ctx, x, y, height, radius, color: FOOD_COLOR })
}

const drawExit = ({ ctx, height }) => ({ x, y, radius }) => {
  drawCircle({ ctx, x, y, height, radius, color: EXIT_COLOR })
}

const draw = state => {
  const {
    alpha,
    ctx,
    width,
    height,
    weems,
    food: { pieces },
    exits: { exits },
  } = state
  ctx.clearRect(0, 0, width, height)
  exits.forEach(drawExit({ ctx, height }))
  weems.forEach(drawWeem({ ctx, alpha, height }))
  pieces.forEach(drawFood({ ctx, height }))
}

export default { init, draw }
