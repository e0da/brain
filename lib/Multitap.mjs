const init = state => {
  Object.values(state.config.multitap.ais).forEach(ai => ai.init(state))
  return {}
}

const update = state => {
  const { input, multitap, weems } = state
  const player = state.controllers[0]
  const inCharge = player
  Object.entries(inCharge).forEach(([key, value]) => {
    input[key] = value
  })
  if (player.toggleAI) {
    const ai = state.config.multitap.ais.toggleAI.update(state)
    input.left = ai.left
    input.right = ai.right
  } else if (player.reverse) {
    input.left = player.right
    input.right = player.left
  } else {
    input.left = player.left
    input.right = player.right
  }
}

export default { init, update }
