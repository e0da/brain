import {
  LENGTH_MIN as WEEM_LENGTH_MIN,
  GROWTH_INCREMENT as WEEM_GROWTH_INCREMENT,
} from './weems.mjs'
import { now } from './util.mjs'

const collide = ({ x: ax, y: ay, radius: ar }, { x: bx, y: by, radius: br }) =>
  Math.abs(Math.hypot(ax - bx, ay - by)) < ar + br

const update = ({ weems, events, meta, food: { pieces } }) => {
  weems.forEach(weem => {
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
