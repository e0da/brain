import { empty } from './util.mjs'

const init = ({ events }) => {
  flush({ events })
  return events
}

const emit = ({ events }, event) => {
  events.push(event)
}

const flush = ({ events }) => {
  empty(events)
}

const all = ({ events }, type) =>
  type ? events.filter(e => e.type === type) : events

export default { init, all, emit, flush }
