export const now = () => new Date().getTime()

export const handleEvents = (listener, callback) => {
  const uniqueEvents = {}
  listener.events.forEach(event => {
    const { type, unique } = event
    if (!uniqueEvents[type]) callback(event)
    if (unique) uniqueEvents[type] = true
  })
  listener.events.length = 0
}
