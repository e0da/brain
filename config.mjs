/*
 * Dimensions for viewport in pixels. Not necessarily the rendering resolution.
 */
const width = 1280
const height = 720

/*
 * Bias toward newer value for interpolation, e.g. to smooth out rendering
 * horizontal motion, how much bias should I give to the new x value over the
 * previous one when taking a weighted average,
 * e.g. x = alpha * x' + (1-alpha) * x''
 */
const alpha = 0.8 // bias toward newer value for interpolation

export default { width, height, alpha }
