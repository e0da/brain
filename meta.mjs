import { handleEvents } from './util.mjs'

const init = () => ({
  score: 0,
  events: [],
})

const update = ({ meta }) => {
  handleEvents(meta, ({ type, amount }) => {
    switch (type) {
      case 'score':
        meta.score = Math.floor(meta.score + amount)
        break
      default:
    }
  })
}

export default { init, update }
