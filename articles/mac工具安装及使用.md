# mac工具安装及使用

[Homebrew](#homebrew)，[cnpm](#cnpm)

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
