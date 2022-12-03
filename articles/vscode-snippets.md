# vscode 配置 snippets （代码片段）

[vscode snippets 官方文档](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

[视频教程](https://www.youtube.com/watch?v=TGh2NpCIDlc)

## snippets 配置步骤

1. command + p
2. 输入 `>snippets`
3. 选择 `>Snippets: Configure User Snippets`
4. 选择 全局配置 或者 项目配置
5. 输入文件名，例如 snippet ，会自动生成配置文件

demo：

```json
{
  // 效果：
  // console.log(content);
  "Print to console.log": {
    "scope": "javascript,typescript", // 不设置 scope 表示所有文件生效
    "prefix": "cl", // 触发的命令
    "body": [
      // $1 $2 表示光标位置，按 tab 切换。
      // TM_SELECTED_TEXT 表示选中的文字。
      "console.${2|log,dir,count,error,info|}(${TM_SELECTED_TEXT:'${1:Here}'});"
    ],
    "description": "Log output to console"
  },
  // 效果：
  // console.time('');
  // content
  // console.timeEnd('');
  "Print to console.time": {
    "prefix": "ct",
    "body": [
      "console.time('$1');",
      "${TM_SELECTED_TEXT}",
      "console.timeEnd('$1');"
    ],
    "description": "Log output to console.time"
  }
}
```

## 设置快捷键触发 snippets

1. command + p
2. 输入 `>keyboard`
3. 选择 `Perference: Open Keyboard Shortcuts (JSON)`
4. 右下角点击 `Define Keybinding`
5. 输入想要的快捷键，回车键确定

demo：

```json
[
  // 效果：按 ctrl+cmd+j 触发 ‘Print to console.time’ 指令
{
  "key": "ctrl+cmd+j",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "name": "Print to console.time"
  }
]
```
