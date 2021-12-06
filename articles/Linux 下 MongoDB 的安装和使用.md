mongoDB [官网地址](https://www.mongodb.com/)

## 安装

[下载地址](https://www.mongodb.com/try/download/community)

![](http://storage.icyc.cc/p/1141466-20200930182856332-1687912921.png)

```bash
# 下载
$ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.4.1.tgz

# 解压
$ tar -zxvf mongodb-linux-x86_64-rhel70-4.4.1.tgz

# 移动位置
$ mv mongodb-linux-x86_64-rhel70-4.4.1 /usr/local/mongodb
```

新建 数据库目录和日志

```bash
# 新建数据库目录
$ mkdir /data/mongo/data

# 新建数据库日志文件
$ touch /data/mongo/logs/mongod.log
```

## 启动

```bash
$ /usr/local/mongodb/bin/mongod --dbpath /data/mongo/data --logpath /data/mongo/logs/mongod.log
```

## 操作

```bash
# 进入 mongo 操作台
/usr/local/mongodb/bin/mongo

# 链接数据库
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

# 查看当前数据库
db
# 查看所有数据库
show dbs

# 创建/使用数据库
use DATABASE_NAME
# 删除数据库
db.dropDatabase()

# 查看已有集合
show collections
# 创建集合
db.createCollection(name, options)
# 删除集合
db.COLLECTION_NAME.drop()

# 插入文档
db.COLLECTION_NAME.insert(document)
# 更新文档
db.COLLECTION_NAME.update(<query>,<update>,options)
# 删除文档
db.COLLECTION_NAME.remove(<query>,options)
# 查询文档
db.COLLECTION_NAME.find(query, projection)

# 认证用户  开启认证后，默认数据库是test，需要切换到对应数据库下认证，例如 use admin
db.auth(username, password)
# 新增用户   需要在admin数据库下
db.createUser(
  {
    user: 'admin',
    pwd: 'admin',
    roles: [{ role: 'root', db: 'admin' }]
  },
  {
    user: 'game',
    pwd: 'game',
    roles: [{ role: 'readWrite', db: 'game' }]
  }
)
# 删除用户
db.removeUser(username)
# 更新用户
db.updateUser(username, update, writeConcern)
# 查看所有用户
show users
# 查找用户
db.getUser(username, args)
```

## 配置远程连接

1. 添加数据库用户，读写等权限
2. 新建配置文件 /usr/local/mongodb/mongod.conf 并写入以下配置（方便启动）
3. 启动服务器 /usr/local/mongodb/bin/mongod --config /usr/local/mongodb/mongod.conf

```conf
# port：端口。默认27017，MongoDB的默认服务TCP端口，监听客户端连接。要是端口设置小于1024，比如1021，则需要root权限启动，不能用mongodb帐号启动
port = 27017

# bind_ip：绑定地址。默认127.0.0.1，只能通过本地连接。设置 0.0.0.0 为不限。
bind_ip = 0.0.0.0

# dbpath：数据存放目录。
dbpath = /data/mongo/data/

# logpath：指定日志文件
logpath = /data/mongo/logs/mongodb.log
# logappend：写日志的模式：设置为true为追加。默认是覆盖。如果未指定此设置，启动时MongoDB的将覆盖现有的日志文件。
logappend = true

# fork：是否后台运行，设置为true 启动 进程在后台运行的守护进程模式。默认false。
# fork = true

# auth：用户认证，默认false。
auth = true
```

高级版本推荐使用 YAML 语法写配置文件

```conf
storage:
   dbPath: "/data/mongo/data/"
   journal:
      enabled: true
systemLog:
   destination: file
   path: "/data/mongo/logs/mongodb.log"
   logAppend: true
net:
   port: 27017
   bindIp: 0.0.0.0
processManagement:
   fork: true
security:
   authorization: enabled
```

## 数据库备份及还原

使用工具 mongodump ，需要去官网下载工具包，https://www.mongodb.com/try/download/database-tools

```bash
# 下载
$ wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-rhel70-x86_64-100.3.1.tgz

# 解压
$ tar -zxvf mongodb-database-tools-rhel70-x86_64-100.3.1.tgz

# 移动位置
$ mv mongodb-database-tools-rhel70-x86_64-100.3.1 /usr/local/mongodb-tools
```

备份：

```bash
$ mongodump -h 数据库端口 -d 数据库名 -o 备份地址

# 如果报错没权限，使用下面方法
$ mongodump -h 数据库端口 -d 数据库名 -o 备份地址 -u 账户名 -p 密码 --authenticationDatabase admin
```

还原：

```bash
# -h <hostname><:port> 默认为： localhost:27017
$ mongorestore -h <hostname><:port> -d dbname <path>
```

## 问题

-bash: ./mongo: cannot execute binary file

原因：系统版本和 mongodb 版本不对应，换个版本试试。
