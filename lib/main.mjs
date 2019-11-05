'use strict'

// import config from './config.mjs'
// import Drawing from './Drawing.mjs'
// import Food from './Food.mjs'
// import Input from './Input.mjs'
// import Meta from './Meta.mjs'
// import Multitap from './Multitap.mjs'
// import Page from './Page.mjs'
// import Exit from './Exit.mjs'
// import Physics from './Physics.mjs'
// import Weems from './Weems.mjs'

// const DEFAULT_STATE = {
//   dt: 0,
//   lastFrame: 0,
//   score: 0,
//   events: [],
//   controllers: {},
//   config,
// }

// const init = state => {
//   const ctx = Drawing.init(state)
//   const input = Input.init(state)
//   const multitap = Multitap.init(state)
//   const food = Food.init(state)
//   const exits = Exit.init(state)
//   const weems = Weems.init(state)
//   const meta = Meta.init(state)
//   const { alpha, width, height } = state.config
//   return {
//     alpha,
//     width,
//     height,
//     ctx,
//     input,
//     multitap,
//     food,
//     exits,
//     weems,
//     meta,
//     ...DEFAULT_STATE,
//   }
// }

// const update = state => (now = 0) => {
//   window.requestAnimationFrame(update(state))

//   state.dt = now - state.lastFrame
//   state.lastFrame = now

//   /* Update order:
//    * 1. Input - First so the player is acting on the last state they observed
//    * 2. Multitap - After input so we can connect controllers to the game
//    * 3. Physics - Next so the physics considers the player's input
//    * 4. Exit - Before the food because it's drawn first and why not?
//    * 5. Food - Before Weems so a Food can't unfairly move out of the way after player input
//    * 6. Weems - Last so they can react to everything
//    * 7. Meta - Last so it can describe the current state
//    * 8. Drawing - Last so we're drawing the latest game state
//    * 9. Page - Last because it's part of rendering */
//   Input.update(state)
//   Multitap.update(state)
//   Physics.update(state)
//   Exit.update(state)
//   Food.update(state)
//   Weems.update(state)
//   Meta.update(state)
//   Drawing.draw(state)
//   Page.render(state)
// }

// const state = init(DEFAULT_STATE)
// update(state)()

import State from './State.mjs'
import Event from './Event.mjs'

const update = State.init(
  {
    count: 0,
  },
  state => {
    console.log('init', state)
  }
)

const events = Event.init()

const handleFrame = (now = 0) => {
  window.requestAnimationFrame(handleFrame)

  update(state => {
    events.emit({ type: 'foo' })
    events.emit({ type: 'bar' })
    state.count++
  })
  console.log(events.all().length)
}

handleFrame()

window.addEventListener('click', () => {
  events.flush('bar')
})
