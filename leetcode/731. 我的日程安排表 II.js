// var MyCalendarTwo = function() {
//   this.tree = new Map();
// };

// MyCalendarTwo.prototype.book = function(start, end) {
//   const update = (start, end, val, l, r, idx) => {
//       if (r < start || end < l) {
//           return;
//       } 
//       if (!this.tree.has(idx)) {
//           this.tree.set(idx, [0, 0]);
//       }
//       if (start <= l && r <= end) {
//           this.tree.get(idx)[0] += val;
//           this.tree.get(idx)[1] += val;
//       } else {
//           const mid = (l + r) >> 1;
//           update(start, end, val, l, mid, 2 * idx);
//           update(start, end, val, mid + 1, r, 2 * idx + 1);
//           if (!this.tree.has(2 * idx)) {
//               this.tree.set(2 * idx, [0, 0]);
//           }
//           if (!this.tree.has(2 * idx + 1)) {
//               this.tree.set(2 * idx + 1, [0, 0]);
//           }
//           this.tree.get(idx)[0] = this.tree.get(idx)[1] + Math.max(this.tree.get(2 * idx)[0], this.tree.get(2 * idx + 1)[0]);
//       }
//   }
//   update(start, end - 1, 1, 0, 1000000000, 1);
//   if (!this.tree.has(1)) {
//       this.tree.set(1, [0, 0])
//   }
//   if (this.tree.get(1)[0] > 2) {
//       update(start, end - 1, -1, 0, 1000000000, 1);
//       return false;
//   }
//   return true;
// };


// var obj = new MyCalendarTwo()
// obj.book(10,20)
// obj.book(50,60)
// obj.book(10,40)
// obj.book(5,15)
// obj.book(5,10)
// obj.book(25,55)
