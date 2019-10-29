export const now = () => new Date().getTime()

export const handleEvents = (listener, callback) => {
  const results = listener.events.map(callback)
  listener.events = []
  return results
}
