# nodejs版本管理工具n教程

nodejs 版本管理工具 [n](https://www.npmjs.com/package/n)。

## 安装

使用 npm 安装

```bash
npm install -g n
```

使用 bash 安装

```bash
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
bash n lts
```

使用 第三方 安装

```bash
brew install n
// 或者
curl -L https://git.io/n-install | bash
```

## 使用

安装 node

```bash
n 12
n 12.16.3  # 最新稳定版
n latest   # 最新发布
```

卸载 node

```bash
n rm 0.9.4 v0.10.0
```

查看&切换

```bash
n
```

__注意：如果用 npm 方式安装，下载和之前 node 一样的版本时，会安装不成功 “dyld: initializer function 0x0 not in mapped image for /usr/local/bin/node”， 需要删除之前的 node 的配置。__
