import {
  GROWTH_INCREMENT as WEEM_GROWTH_INCREMENT,
  LENGTH_MIN as WEEM_LENGTH_MIN,
  STATES as WEEM_STATES,
} from './Weems.mjs'

const collide = ({ x: ax, y: ay, radius: ar }, { x: bx, y: by, radius: br }) =>
  Math.abs(Math.hypot(ax - bx, ay - by)) < ar + br

const update = ({ weems, events, meta, food: { pieces }, exits }) => {
  weems.forEach(weem => {
    exits.exits.forEach(exit => {
      if (weem.state === WEEM_STATES.DEFAULT && collide(weem, exit)) {
        weem.events.push({ type: 'exiting' })
        exits.events.push({ type: 'exiting' })
      }
    })
    pieces.forEach(piece => {
      if (collide(weem, piece)) {
        weem.events.push({ type: 'ate' })
        piece.events.push({ type: 'eaten' })
        meta.events.push({ type: 'score', amount: WEEM_GROWTH_INCREMENT })
      }
    })
    weem.tail.slice(WEEM_LENGTH_MIN).forEach((segment, index) => {
      if (collide(weem, segment)) {
        weem.events.push({ type: 'bitten', segment })
        const amount = -(weem.tail.length - index) * 1.2
        meta.events.push({ type: 'score', amount, unique: true })
      }
    })
  })
}

export default { update }
