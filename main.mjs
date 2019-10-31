'use strict'

import Config from './config.mjs'
import Drawing from './drawing.mjs'
import Food from './food.mjs'
import Input from './input.mjs'
import Page from './page.mjs'
import Physics from './physics.mjs'
import { handleEvents } from './util.mjs'
import Weems from './weems.mjs'
import Meta from './meta.mjs'

const init = ({ alpha, width, height }) => {
  const ctx = Drawing.init({ width, height })
  const input = Input.init()
  const food = Food.init({ width, height })
  const weems = Weems.init({ width, height })
  const meta = Meta.init()
  return {
    alpha,
    width,
    height,
    ctx,
    input,
    food,
    weems,
    meta,
    dt: 0,
    lastFrame: 0,
    score: 0,
    events: [],
  }
}

const update = state => (now = 0) => {
  window.requestAnimationFrame(update(state))

  state.dt = now - state.lastFrame
  state.lastFrame = now

  /* Update order:
   * 1. Input - First so the player is acting on the last state they observed
   * 2. Physics - Second so the physics considers the player's input
   * 3. Food - Before Weems so a Food can't unfairly move out of the way after player input
   * 4. Weems - Last so they can react to everything
   * 5. Meta - Last so it can describe the current state
   * 6. Drawing - Last so we're drawing the latest game state
   * 7. Page - Last because it's part of rendering */
  Input.update(state)
  Physics.update(state)
  Food.update(state)
  Weems.update(state)
  Meta.update(state)
  Drawing.draw(state)
  Page.render(state)
}

const state = init({
  alpha: Config.alpha,
  width: Config.width,
  height: Config.height,
})
update(state)()
