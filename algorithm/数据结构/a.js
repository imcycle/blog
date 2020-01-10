//节点
function Node(element) {
  this.element = element;   //当前节点的元素
  this.next = null;         //下一个节点链接
}


//查找给定节点
function find(item) {
  var currNode = this.head;
  while (currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}

//插入节点
function insert(newElement, item) {
  var newNode = new Node(newElement);
  var currNode = this.find(item);
  newNode.next = currNode.next;
  currNode.next = newNode;
}

function LList() {
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.remove = remove;
  this.findPrev = findPrev;
  this.display = display;
}