const init = () => {
  const input = {
    left: false,
    right: false,
    up: false,
    down: false,
    btnA: false,
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
    Space: 'btnA',
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

const update = state => {}

export default { init, update }
