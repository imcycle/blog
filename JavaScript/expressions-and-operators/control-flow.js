/**
 * break
 * break 语句中止当前循环，switch语句或label语句，并把程序控制流转到紧接着被中止语句后面的语句。
 */
// break [label];

// break语句包含一个可选的标签，可允许程序摆脱一个被标记的语句。
// break语句需要内嵌在引用的标签中。
// 被标记的语句可以是任何 块 语句；不一定是循环语句。

function testBreak(x) {
  var i = 0;

  while (i < 6) {
    if (i == 3) {
      break;
    }
    i += 1;
  }

  return i * x;
};

outer_block: {

  inner_block: {
    console.log('1');
    break outer_block;      // breaks out of both inner_block and outer_block
    console.log(':-(');    // skipped
  }

  console.log('2');        // skipped
}

block_1: {
  console.log('1');
  break block_2;            // SyntaxError: label not found
}

block_2: {
  console.log('2');
}





/**
 * continue
 * continue 语句结束当前（或标签）的循环语句的本次迭代，并继续执行循环的下一次迭代。
 * continue [ label ];
 */
i = 0;
n = 0;
while (i < 5) {
  i++;
  if (i === 3) {
    continue;
  }
  n += i;
}


var i = 0,
  j = 8;

checkiandj: while (i < 4) {
  console.log("i: " + i);
  i += 1;

  checkj: while (j > 4) {
    console.log("j: " + j);
    j -= 1;
    if ((j % 2) == 0)
      continue checkj;
    console.log(j + " is odd.");
  }
  console.log("i = " + i);
  console.log("j = " + j);
}




/**
 * Empty
 * 空语句用来表明没有语句，尽管 JavaScript 语法希望有语句。
 */
if (one)
  doOne();
else if (two)
  doTwo();
else if (three)
  ; // nothing here
else if (four)
  doFour();
else
  launchRocket();



/**
 * switch
 * switch 语句评估一个表达式，将表达式的值与case子句匹配，并执行与该情况相关联的语句。
 */
// switch (expression) {
//   case value1:
//     // 当 expression 的结果与 value1 匹配时，执行此处语句
//     [break;]
//   case value2:
//     // 当 expression 的结果与 value2 匹配时，执行此处语句
//     [break;]
//   ...
//   case valueN:
//     // 当 expression 的结果与 valueN 匹配时，执行此处语句
//     [break;]
//   [default:
//     // 如果 expression 与上面的 value 值都不匹配，执行此处语句
//     [break;]]
// }

// 如果忘记 break 会怎么样？
// 如果你忘记添加 break，那么代码将会从值所匹配的 case 语句开始运行，然后持续执行下一个 case 语句而不论值是否匹配。例子如下：
var foo = 0;
switch (foo) {
  case -1:
    console.log('negative 1');
    break;
  case 0: // foo 的值为 0 所以匹配这里所以这一块会运行
    console.log(0);
  // 注意：那个没写的 break 原本在这儿
  case 1: // 'case 0:' 里没有 break 语句所以这个 case 也会运行
    console.log(1);
    break; // 遇到了 break，所以不会再继续进入 'case 2:' 了
  case 2:
    console.log(2);
    break;
  default:
    console.log('default');
}


// 我能把 default 放到 case 之间吗？
// 可以啊！JavaScript 会在它找不到匹配项时跳回到那个 default ：
var foo = 5;
switch (foo) {
  case 2:
    console.log(2);
    break; // 遇到 break，所以不会继续进入 'default:'
  default:
    console.log('default')
  // 掉到下面
  case 1:
    console.log('1');
}


var Animal = 'Giraffe';
switch (Animal) {
  case 'Cow':
  case 'Giraffe':
  case 'Dog':
  case 'Pig':
    console.log('This animal will go on Noah\'s Ark.');
    break;
  case 'Dinosaur':
  default:
    console.log('This animal will not.');
}



var foo = 1;
var output = 'Output: ';
switch (foo) {
  case 0:
    output += 'So ';
  case 1:
    output += 'What ';
    output += 'Is ';
  case 2:
    output += 'Your ';
  case 3:
    output += 'Name';
  case 4:
    output += '?';
    console.log(output);
    break;
  case 5:
    output += '!';
    console.log(output);
    break;
  default:
    console.log('Please pick a number from 0 to 5!');
}