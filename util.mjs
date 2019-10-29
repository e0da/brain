export const now = () => new Date().getTime()

export const handleEvents = (thing, callback) => {
  const results = thing.events.map(callback)
  thing.events = []
  return results
}
