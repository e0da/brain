'use strict'

import Config from './config.mjs'
import Drawing from './drawing.mjs'
import Food from './food.mjs'
import Input from './input.mjs'
import Page from './page.mjs'
import Physics from './physics.mjs'
import { handleEvents } from './util.mjs'
import Weems from './weems.mjs'

const init = ({ alpha, width, height }) => {
  const ctx = Drawing.init({ width, height })
  const input = Input.init()
  const food = Food.init({ width, height })
  const weems = Weems.init({ width, height })
  return {
    alpha,
    width,
    height,
    ctx,
    input,
    food,
    weems,
    dt: 0,
    lastFrame: 0,
    score: 0,
    events: [],
  }
}

const update = state => (now = 0) => {
  state.dt = now - state.lastFrame
  state.lastFrame = now
  Input.update(state)
  Physics.update(state)
  Food.update(state)
  Weems.update(state)
  Drawing.draw(state)
  Page.render(state)
  handleEvents(state, ({ type, amount }) => {
    switch (type) {
      case 'score':
        state.score = Math.floor(state.score + amount)
        break
      default:
    }
  })
  window.requestAnimationFrame(update(state))
}

const state = init({
  alpha: Config.alpha,
  width: Config.width,
  height: Config.height,
})
update(state)()
