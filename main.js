'use strict'

const WIDTH = 1280
const HEIGHT = 720

const SNAKE_RADIUS = 10
const SNAKE_TURN_RATE = 0.1
const SNAKE_SPEED = 5
const SNAKE_SPEED_MIN = 1
const SNAKE_SPEED_MAX = 10
const SNAKE_SPEED_INCREMENT = 0.1
const SNAKE_LENGTH_MIN = 15
const SNAKE_LENGTH_MAX = 150
const SNAKE_GROWTH_INCREMENT = 5

const initContext = (width, height) => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  return ctx
}

const initInput = () => {
  const input = {
    left: false,
    right: false,
    up: false,
    down: false,
  }
  const keyMap = {
    KeyA: 'left',
    KeyJ: 'left',
    ArrowLeft: 'left',
    KeyD: 'right',
    KeyL: 'right',
    ArrowRight: 'right',
    KeyW: 'up',
    KeyI: 'up',
    ArrowUp: 'up',
    KeyS: 'down',
    KeyK: 'down',
    ArrowDown: 'down',
  }
  window.addEventListener('keydown', ({ code }) => {
    const action = keyMap[code]
    if (action) input[action] = true
  })
  window.addEventListener('keyup', ({ code }) => {
    const action = keyMap[code]
    if (action) input[action] = false
  })
  return input
}

const init = (width, height) => {
  const ctx = initContext(width, height)
  const input = initInput()
  return {
    ctx,
    input,
    width,
    height,
    delta: 0,
    lastFrame: 0,
    snakes: [],
  }
}

const addSnake = state => {
  const { width, height } = state
  const snake = {
    x: width / 2,
    y: height / 2,
    length: SNAKE_LENGTH_MIN,
    rotation: -Math.PI / 2,
    speed: 1,
  }
  state.snakes.push(snake)
}

const moveSnake = ({
  width,
  height,
  input: { left, right, up, down },
}) => snake => {
  if (left) snake.rotation -= SNAKE_TURN_RATE
  if (right) snake.rotation += SNAKE_TURN_RATE
  snake.rotation %= 2 * Math.PI
  if (snake.rotation < 0) snake.rotation += 2 * Math.PI

  if (up) snake.speed += SNAKE_SPEED_INCREMENT
  if (down) snake.speed -= SNAKE_SPEED_INCREMENT
  if (snake.speed < SNAKE_SPEED_MIN) snake.speed = SNAKE_SPEED_MIN

  const dx = snake.speed * Math.cos(snake.rotation)
  const dy = snake.speed * Math.sin(snake.rotation)
  snake.x += dx
  snake.y += dy

  snake.x = Math.max(0, snake.x)
  snake.x = Math.min(snake.x, width)
  snake.y = Math.max(0, snake.y)
  snake.y = Math.min(snake.y, height)
}

const updateSnakes = state => {
  const { snakes } = state
  if (snakes.length === 0) addSnake(state)
  snakes.forEach(moveSnake(state))
}

const updateInput = state => {}

const update = state => {
  updateInput(state)
  updateSnakes(state)
}

const drawCircle = (ctx, x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, SNAKE_RADIUS, 0, 2 * Math.PI)
  ctx.stroke()
}

const drawSnake = ctx => snake => {
  drawCircle(ctx, snake.x, snake.y)
}

const draw = state => {
  const { ctx, snakes } = state
  snakes.forEach(drawSnake(ctx))
}

const handleFrame = state => now => {
  state.delta = now - state.lastFrame
  state.lastFrame = now
  update(state)
  draw(state)
  window.requestAnimationFrame(handleFrame(state))
}

const state = init(WIDTH, HEIGHT)
window.requestAnimationFrame(handleFrame(state))
