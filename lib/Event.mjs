import { empty } from './util.mjs'

const all = events => type =>
  type ? events.filter(e => e.type === type) : events

const emit = events => event => {
  events.push(event)
}

const flush = events => type => {
  if (type) {
    all(events)(type).forEach(event => {
      events.splice(events.indexOf(event), 1)
    })
  } else {
    empty(events)
  }
}

const init = () => {
  const events = []
  return {
    all: all(events),
    emit: emit(events),
    flush: flush(events),
  }
}

export default { init }
