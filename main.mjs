'use strict'

import Drawing from './drawing.mjs'
import Snakes from './snakes.mjs'
import Input from './input.mjs'

const width = 1280
const height = 720

const init = ({ width, height }) => {
  const ctx = Drawing.init(width, height)
  const input = Input.init()
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

const update = state => (now = 0) => {
  state.delta = now - state.lastFrame
  state.lastFrame = now
  Input.update(state)
  Snakes.update(state)
  Drawing.draw(state)
  window.requestAnimationFrame(update(state))
}

const state = init({ width, height })
update(state)()
