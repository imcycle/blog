# Linux 升级 nodejs12 报错，需要升级 glibc 和 gcc

linux 服务器老，编译器版本低，node 12+ 跑不起来，需要升级 GLIBC 和 GLIBCXX

```bash
$ node -v
node: /lib64/libc.so.6: version `GLIBC_2.16' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.17' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by node)
node: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.14' not found (required by node)
node: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.18' not found (required by node)
node: /usr/lib64/libstdc++.so.6: version `CXXABI_1.3.5' not found (required by node)
node: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.15' not found (required by node)
```

## 解决方法

### 升级 GLIBC

```bash
# 下载 & 解压
wget https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
tar -xvf glibc-2.17.tar.gz

# 1. Go to the glibc-2.17 directory
cd glibc-2.17
# 2. Create the build directory
mkdir build
# 3. Go into the build directory
cd build
# 4, execute . /configure
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
# 5. Install
make && make install
```

查看：

```bash
$ ls -l /lib64/libc.so.6
lrwxrwxrwx 1 root root 12 5月  13 16:24 /lib64/libc.so.6 -> libc-2.17.so
```

### GLIBCXX 错误，需要升级 gcc

```bash
# 查看
strings /usr/lib64/libstdc++.so.6 | grep GLIBC
```

升级教程：https://www.cnblogs.com/405845829qq/p/10340912.html

文中第一个下载地址不能用了，第二个可以 http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/gcc-5.2.0/gcc-5.2.0.tar.bz2 。服务器下载速度较慢，可以下载到本地，上传服务器。

**注意：安装目录是 /usr/local/lib64 ，最终目录是 /usr/lib64 ，最后需要按文中更换软链接。**
