const cache = {}

const cachedNode = selector => {
  if (!cache[selector]) {
    const node = document.querySelector(selector)
    cache[selector] = node
  }
  return cache[selector]
}

const scoreNode = () => cachedNode('#score')

const render = ({ meta: { score } }) => {
  scoreNode().innerText = score
}

export default { render }
