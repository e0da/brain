import TurnToward from './AIs/TurnToward.mjs'

/*
 * Dimensions for viewport in pixels. Not necessarily the rendering resolution.
 */
export const width = 1280
export const height = 720

/*
 * Bias toward newer value for interpolation, e.g. to smooth out rendering
 * horizontal motion, how much bias should I give to the new x value over the
 * previous one when taking a weighted average,
 * e.g. x = alpha * x' + (1-alpha) * x''
 */
export const alpha = 0.8 // bias toward newer value for interpolation

export const input = {
  keys: {
    hold: {
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
      Space: 'grow',
      KeyX: 'shrink',
    },
    toggle: {
      KeyF: 'toggleAI',
      KeyR: 'reverse',
    },
  },
}

export const multitap = {
  ais: {
    toggleAI: TurnToward,
  },
}

export default { width, height, alpha, input, multitap }
