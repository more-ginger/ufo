import { map } from 'lodash'

export const traverseAndFlatten = function (currentNode, target, flattenedKey) {
  const nested = []
  map(currentNode, (node, i) => {
    const obj = {}
    obj.datetime = node.datetime

    if (node.value !== undefined && node.value.length > 0) {
      const shapes = ['formation', 'light', 'other', 'sphere', 'triangle', 'circle', 'diamond', 'fireball', 'oval', 'disk', 'unknown', 'chevron', 'nan', 'changing', 'rectangle', 'cross', 'flash', 'cigar', 'teardrop', 'cylinder', 'egg', 'cone']
      const currentShapes = map(node.value, (va) => { return va.key })
      const remainingShapes = shapes.filter(function (el) {
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
