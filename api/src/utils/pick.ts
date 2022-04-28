/**
 * Create an object composed of the picked object properties
 */
export const pick = (
  object: Object,
  keys: string[]
): {
  [key: string]: any
} => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key]
    }
    return obj
  }, {})
}
