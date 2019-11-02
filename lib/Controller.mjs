import { sequence } from './util.mjs'

const TOGGLE_AI_DEFAULT = true

export const DEFAULT_CONTROLLER = {
  left: false,
  right: false,
  up: false,
  down: false,
  grow: false,
  shrink: false,
  toggleAI: TOGGLE_AI_DEFAULT,
  reverse: false,
}

const getID = sequence()

const init = () => ({
  controllers: {},
})

const create = controllers => {
  const id = getID()
  const controller = { id, ...DEFAULT_CONTROLLER }
  controllers[id] = controller
  return controller
}

export default { create }
