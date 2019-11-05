let state

const update = state0 => callback => {
  state = callback(state0)
  return state
}

const init = (state0 = {}, callback) => {
  state = state0
  callback(state)
  return update(state)
}

export default { init, update }
