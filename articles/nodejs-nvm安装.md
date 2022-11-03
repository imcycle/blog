# nodejs 管理工具 nvm 的安装及使用

官方介绍：nvm allows you to quickly install and use different versions of node via the command line.

[github nvm](https://github.com/nvm-sh/nvm)

## 下载与安装

更多方式查看官网，下面介绍两种常用的。

### curl 方式

ps: 如果下载遇到 443，请使用代理。[解决方式](http://icyc.cc/article/6048256981ae1456a811ffd5)

```bash
# 下载
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# 安装
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### git 方式

```bash
# 切到这个目录
cd ~/

# clone
git clone https://github.com/nvm-sh/nvm.git .nvm

# 安装
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

## 使用

```bash
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```
