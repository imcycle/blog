// https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
/**
 * FormData
 * FormData 接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用 XMLHttpRequest.send() 方法送出，本接口和此方法都相当简单直接。
 * 如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。
 *
 * 实现了 FormData 接口的对象可以直接在for...of结构中使用，而不需要调用entries() : for (var p of myFormData) 的作用和 for (var p of myFormData.entries()) 是相同的。
 */


/**
 * 构造函数
 * FormData
 */



/**
 * 方法
 */
FormData.append()
// 向 FormData 中添加新的属性值，FormData 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。
FormData.delete()
// 从 FormData 对象里面删除一个键值对。
FormData.entries()
// 返回一个包含所有键值对的iterator对象。
FormData.get()
// 返回在 FormData 对象中与给定键关联的第一个值。
FormData.getAll()
// 返回一个包含 FormData 对象中与给定键关联的所有值的数组。
FormData.has()
// 返回一个布尔值表明 FormData 对象是否包含某些键。
FormData.keys()
// 返回一个包含所有键的iterator对象。
FormData.set()
// 给 FormData 设置属性值，如果FormData 对应的属性值存在则覆盖原值，否则新增一项属性值。
FormData.values()
// 返回一个包含所有值的iterator对象。



var formData = new FormData(); // 当前为空
formData.append('username', 'Chris');






/**
<form id="myForm" name="myForm">
  <div>
    <label for="username">Enter name:</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="useracc">Enter account number:</label>
    <input type="text" id="useracc" name="useracc">
  </div>
  <div>
    <label for="userfile">Upload file:</label>
    <input type="file" id="userfile" name="userfile">
  </div>
<input type="submit" value="Submit!">
</form>

var myForm = document.getElementById('myForm');
formData = new FormData(myForm);
 */