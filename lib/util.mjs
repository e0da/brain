export const deg = rad => rad * (180 / Math.PI)

export const rad = deg => deg * (Math.PI / 180)

export const now = () => new Date().getTime()

export const randomPoint = ({ width, height }) => {
  const x = Math.random() * width
  const y = Math.random() * height
  return { x, y }
}

export const handleEvents = (listener, callback) => {
  const uniqueEvents = {}
  listener.events.forEach(event => {
    const { type, unique } = event
    if (!uniqueEvents[type]) callback(event)
    if (unique) uniqueEvents[type] = true
  })
  listener.events.length = 0
}

export const lpad = (str, pad, char = ' ') => {
  const delta = Math.max(0, pad - str.length)
  return `${Array(delta)
    .fill(null)
    .map(() => char)
    .join('')}${str}`
}

export const sequence = (prefix = '', pad = 0) => {
  let index = 0
  return () => {
    return `${prefix}${lpad(String(index++), pad, '0')}`
  }
}

// Universal arbitrary ID generator
export const ID = sequence()
