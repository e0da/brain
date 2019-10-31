import Controller from '../Controller.mjs'

const init = ({ controllers }) => {
  const controller = Controller.create(controllers)
  return { controller }
}

const update = state => ({
  left: true,
  right: false,
})

export default { init, update }
