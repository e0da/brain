import Controller from '../Controller.mjs'
import { deg } from '../util.mjs'

const init = ({ controllers }) => {
  const controller = Controller.create(controllers)
  return { controller }
}

const nearestPiece = (weem, state) => {
  const sortedFoodDistances = state.food.pieces
    .map(piece => {
      const distance = Math.hypot(weem.x - piece.x, weem.y - piece.y)
      return [distance, piece]
    })
    .sort((left, right) => left[0] - right[0])
  return sortedFoodDistances[0] ? sortedFoodDistances[0][1] : null
}

const update = state => {
  const weem = state.weems[0]
  const piece = nearestPiece(weem, state)
  let heading = piece
    ? Math.atan2(piece.y - weem.y, piece.x - weem.x)
    : weem.rotation
  const bearing = heading + Math.PI / 2
  const delta = bearing - weem.rotation - Math.PI / 2
  console.log(delta)
  console.log({
    heading: deg(heading),
    bearing: deg(bearing),
    rotation: deg(weem.rotation),
    delta: deg(bearing - weem.rotation - Math.PI / 2),
  })
  const turnLeft = delta > 0
  const turnRight = delta < 0
  const player = state.controllers[0]
  return {
    left: player.left,
    right: player.right,
  }
}

export default { init, update }
