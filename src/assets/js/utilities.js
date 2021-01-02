import { map } from 'lodash'

export const traverseAndFlatten = function (currentNode, keys) {
  const nested = []
  map(currentNode, (node, i) => {
    const obj = {}
    obj.datetime = node.datetime

    if (node.value !== undefined && node.value.length > 0) {
      const currentShapes = map(node.value, (va) => { return va.key })
      const remainingShapes = keys.filter(function (el) {
        return currentShapes.indexOf(el) < 0
      })

      map(node.value, (va) => {
        obj[va.key] = va.value

        map(remainingShapes, (s) => {
          obj[s] = 0
        })
      })
    } else { }
    nested.push(obj)
  })
  return nested
}
