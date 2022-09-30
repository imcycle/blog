/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function(groupSizes) {
  var map = new Map()

  groupSizes.forEach((v, i) => {
    var list = map.get(v)
    if (list) {
      if (list.at(-1).length < v) {
        list.at(-1).push(i)
      } else {
        list.push([i])
      }
    } else {
      map.set(v, [[i]])
    }
  })

  return [...map.values()].flat()
};