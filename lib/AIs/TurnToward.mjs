import Controller from '../Controller.mjs'

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
  heading %= 2 * Math.PI
  if (heading < 0) heading += 2 * Math.PI
  const turnLeft = heading < weem.rotation
  const turnRight = heading > weem.rotation
  return {
    left: turnLeft,
    right: turnRight,
  }
}

export default { init, update }
