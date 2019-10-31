import Controller from './Controller.mjs'

// Returns the next ID, e.g. getID() => 0; getID() => 1; getID() => 2
const getID = (() => {
  let count = 0
  return () => count++
})()

const setHoldKeys = config => controller => {
  window.addEventListener('keydown', ({ code }) => {
    const action = config.keys.hold[code]
    if (action) controller[action] = true
  })
  window.addEventListener('keyup', ({ code }) => {
    const action = config.keys.hold[code]
    if (action) controller[action] = false
  })
}

const setToggleKeys = config => {
  const toggles = Object.values(config.keys.toggle)
  const pressed = toggles.reduce((acc, key) => {
    acc[key] = false
    return acc
  }, {})
  const keyState = { ...pressed }
  return controller => {
    window.addEventListener('keydown', ({ code }) => {
      const action = config.keys.toggle[code]
      if (action && pressed[action] === false) {
        controller[action] = !controller[action]
        pressed[action] = true
      }
    })
    window.addEventListener('keyup', ({ code }) => {
      const action = config.keys.toggle[code]
      if (action && pressed[action] === true) {
        pressed[action] = false
      }
    })
  }
}

const init = state => {
  const { config, controllers } = state
  const controller = Controller.create(controllers)
  setHoldKeys(config.input)(controller)
  setToggleKeys(config.input)(controller)
  return { [controller.id]: controller }
}

const update = state => {}

export default { init, update }
