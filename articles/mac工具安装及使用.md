# mac工具安装及使用

[Homebrew](#homebrew)，[cnpm](#cnpm)，[nginx](#nginx)

## Homebrew

The Missing Package Manager for macOS (or Linux). [官网](https://brew.sh/)

安装

```shell
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew
...
```

如果连接被拒绝，查看解决方案 [curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused](https://www.cnblogs.com/whosmeya/p/12913846.html)。

查看

```shell
$ brew -v
Homebrew 2.2.17
Homebrew/homebrew-core (git revision 3dad3; last commit 2020-05-19)
```

使用

```shell
# 安装管理
$ brew --help
Example usage:
  brew search [TEXT|/REGEX/]
  brew info [FORMULA...]
  brew install FORMULA...
  brew update
  brew upgrade [FORMULA...]
  brew uninstall FORMULA...
  brew list [FORMULA...]
...

# 服务管理
$ brew services --help
...
```

使用 brew 安装的软件默认路径：<code>/usr/local/Cellar</code>

<br />

## cnpm

淘宝 NPM 镜像。 [官网](https://npm.taobao.org/)

安装

```shell
$ sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
/usr/local/bin/cnpm -> /usr/local/lib/node_modules/cnpm/bin/cnpm
+ cnpm@6.1.1
added 685 packages from 957 contributors in 11.266s
```

查看

```shell
$ cnpm -v
cnpm@6.1.1 (/usr/local/lib/node_modules/cnpm/lib/parse_argv.js)
npm@6.14.5 (/usr/local/lib/node_modules/cnpm/node_modules/npm/lib/npm.js)
node@12.16.2 (/usr/local/bin/node)
npminstall@3.27.0 (/usr/local/lib/node_modules/cnpm/node_modules/npminstall/lib/index.js)
prefix=/usr/local
darwin x64 18.7.0
registry=https://r.npm.taobao.org
```

<br />

## nginx

反向代理服务器。

```shell
# 安装
$ brew install nginx
...

# 查看
$ brew list
nginx

# 启动 nginx
$ brew services start nginx
brew services start nginx
$ brew services list
Name  Status  User      Plist
nginx started caoyucong /Users/caoyucong/Library/LaunchAgents/homebrew.mxcl.nginx.plist
```

浏览器输入 <code>http://localhost:8080/</code> 看到启动成功。

查看 nginx.conf 目录

```shell
$ find /|grep nginx.conf
/usr/local/etc/nginx/nginx.conf.default
/usr/local/etc/nginx/nginx.conf
/usr/local/Cellar/nginx/1.17.10/.bottle/etc/nginx/nginx.conf.default
/usr/local/Cellar/nginx/1.17.10/.bottle/etc/nginx/nginx.conf
```

查看 nginx 使用的 nginx.conf 目录

```shell
$ nginx -t
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

查看 nginx 环境配置

```shell
$ nginx -V
nginx version: nginx/1.17.10
built by clang 11.0.0 (clang-1100.0.33.17)
built with OpenSSL 1.1.1f  31 Mar 2020 (running with OpenSSL 1.1.1g  21 Apr 2020)
TLS SNI support enabled
configure arguments: --prefix=/usr/local/Cellar/nginx/1.17.10 --sbin-path=/usr/local/Cellar/nginx/1.17.10/bin/nginx
...
```

如何配置 nginx.conf 查看文章：[Nginx配置Web项目（多页面应用，单页面应用）](https://www.cnblogs.com/whosmeya/p/12466396.html)