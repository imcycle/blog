// 去重
function format(v) {
  if (Array.isArray(v)) {
    return v.toString();
  }
  if (Number.isNaN(v)) {
    return 'NaN';
  }
  if (v === null) {
    return null;
  }
  if (typeof v === 'object') {
    return JSON.stringify(v);
  }
  return v
}

function duplicateRemoval(arr) {
  var newArr = [];
  arr.forEach(item => {
    if (!newArr.find(d => format(d) === format(item))) {
      newArr.push(item)
    }
  })
  return newArr;
}


duplicateRemoval([123, "meili", "123", "mogu", 123])
// [123, "meili", "123", "mogu"]

duplicateRemoval([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"])
// [123, [1, 2, 3], [1, "2", 3], "meili"]

duplicateRemoval([123, { a: 1 }, { a: { b: 1 } }, { a: "1" }, { a: { b: 1 } }, "meili"])
// [123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]
