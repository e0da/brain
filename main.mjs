'use strict'

import Config from './config.mjs'
import Drawing from './drawing.mjs'
import Input from './input.mjs'
import Snakes from './snakes.mjs'

const init = ({ alpha, width, height }) => {
  const ctx = Drawing.init(width, height)
  const input = Input.init()
  return {
    alpha,
    width,
    height,
    ctx,
    input,
    dt: 0,
    lastFrame: 0,
    snakes: [],
  }
}

const update = state => (now = 0) => {
  state.dt = now - state.lastFrame
  state.lastFrame = now
  Input.update(state)
  Snakes.update(state)
  Drawing.draw(state)
  window.requestAnimationFrame(update(state))
}

const state = init({
  alpha: Config.alpha,
  width: Config.width,
  height: Config.height,
})
update(state)()
