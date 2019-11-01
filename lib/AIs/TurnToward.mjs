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

const normalizedBearing = bearing =>
  bearing > Math.PI ? -2 * Math.PI + bearing : bearing

const decideTurns = (() => {
  const consecutiveTurns = {
    left: 0,
    right: 0,
  }
  return delta => {
    let turnLeft = delta > 0
    let turnRight = delta < 0
    /*
     * All this deadlock stuff is to prevent the weem from chasing its tail
     * indefinitely by briefly interrupting it if it seems to be going in a
     * circle. It is messy and I'd like it to be cleaner. *
     */
    consecutiveTurns.left = turnLeft ? consecutiveTurns.left + 1 : 0
    consecutiveTurns.right = turnRight ? consecutiveTurns.right + 1 : 0
    const deadlockThreshold = 120
    const deadlockLimit = 130
    if (consecutiveTurns.left > deadlockThreshold) turnLeft = false
    if (consecutiveTurns.right > deadlockThreshold) turnRight = false
    if (consecutiveTurns.left > deadlockLimit) consecutiveTurns.left = 0
    if (consecutiveTurns.right > deadlockLimit) consecutiveTurns.right = 0
    return [turnLeft, turnRight]
  }
})()

const update = state => {
  const weem = state.weems[0]
  const piece = nearestPiece(weem, state)
  let course = piece
    ? Math.atan2(piece.y - weem.y, piece.x - weem.x)
    : weem.rotation
  const bearing = normalizedBearing(weem.rotation)
  const delta = normalizedBearing(course - bearing)
  const [turnLeft, turnRight] = decideTurns(delta)
  return {
    left: turnLeft,
    right: turnRight,
  }
}

export default { init, update }
