# JS 实现重载

```javascript
var people = {
  values: ["people1", "people2", "people3", "people4"]
};

function addMethod(object, name, types, fn) {
  fn._types = types
  var old = object[name]
  object[name] = function() {
    var argTypesStr = Array.prototype.map.call(arguments, v => typeof v).toString()
    var needTypesStr = fn._types.toString()
    if (fn.length === arguments.length && argTypesStr === needTypesStr) {
      return fn.apply(this, arguments)
    } else if (typeof old === 'function') {
      return old.apply(this, arguments)
    }
  }
}

addMethod(people, 'find', ['string'], function (a) {
  console.log(this.values[0])
})
addMethod(people, 'find', ['number'], function (a) {
  console.log(this.values[1])
})
addMethod(people, 'find', ['string', 'number'], function (a, b) {
  console.log(this.values[2])
})
addMethod(people, 'find', ['number', 'string'], function (a, b) {
  console.log(this.values[3])
})

people.find('1')  // "people1"
people.find(1)  // "people2"
people.find('1', 1)  // "people3"
people.find(1, '1')  // "people4"
```



