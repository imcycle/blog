# 浏览器 —— 页面循环系统

## 消息队列 和 事件循环

渲染主线程

消息队列 宏任务

每个宏任务都有一个**微任务列表**，在宏任务的执行过程中产生微任务会被添加到该列表中，等宏任务快执行结束之后，会执行微任务列表，所以微任务依然运行在当前宏任务的执行环境中。

如果其他进程想要发送任务给页面主线程，那么先通过 IPC 把任务发送给渲染进程的 IO 线程，IO 线程再把任务发送给页面主线程。

如何安全退出：确定要退出当前页面时，页面主线程会设置一个退出标志的变量，在每次执行完一个任务时，判断是否有设置退出标志。

## setTimeout

当通过 JavaScript 调用 setTimeout 设置回调函数的时候，渲染进程将会创建一个**回调任务**，包含了回调函数、当前发起时间、延迟执行时间，再将该任务添加到**延迟执行队列**中。

每次宏任务执行后，

```c#
void ProcessTimerTask(){
  // 从 delayed_incoming_queue 中取出已经到期的定时器任务
  // 依次执行这些任务
}
 
TaskQueue task_queue；
void ProcessTask();
bool keep_running = true;
void MainTherad(){
  for(;;){
    // 执行消息队列中的任务
    Task task = task_queue.takeTask();
    ProcessTask(task);
    
    // 执行延迟队列中的任务
    ProcessDelayTask()
 
    if(!keep_running) // 如果设置了退出标志，那么直接退出线程循环
        break; 
  }
}
```