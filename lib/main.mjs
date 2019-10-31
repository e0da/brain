'use strict'

import config from './config.mjs'
import Drawing from './Drawing.mjs'
import Food from './Food.mjs'
import Input from './Input.mjs'
import Meta from './Meta.mjs'
import Multitap from './Multitap.mjs'
import Page from './Page.mjs'
import Physics from './Physics.mjs'
import Weems from './Weems.mjs'

const DEFAULT_STATE = {
  dt: 0,
  lastFrame: 0,
  score: 0,
  events: [],
  controllers: {},
  config,
}

const init = state => {
  const ctx = Drawing.init(state)
  const input = Input.init(state)
  const multitap = Multitap.init(state)
  const food = Food.init(state)
  const weems = Weems.init(state)
  const meta = Meta.init(state)
  const { alpha, width, height } = state.config
  return {
    alpha,
    width,
    height,
    ctx,
    input,
    multitap,
    food,
    weems,
    meta,
    ...DEFAULT_STATE,
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
  Multitap.update(state)
  Physics.update(state)
  Food.update(state)
  Weems.update(state)
  Meta.update(state)
  Drawing.draw(state)
  Page.render(state)
}

const state = init(DEFAULT_STATE)
update(state)()
