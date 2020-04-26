# Git常用命令

导航

* <a href="#remote">remote</a>
* <a href="#reset">reset</a>
* <a href="#push">push</a>
* <a href="#tag">tag</a>

## <span id="remote">remote</span>

管理追踪远程库。

```txt
git remote [-v | --verbose]
git remote add [-t <branch>] [-m <master>] [-f] [--[no-]tags] [--mirror=<fetch|push>] <name> <url>
git remote rename <old> <new>
git remote remove <name>
git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
git remote set-branches [--add] <name> <branch>…​
git remote get-url [--push] [--all] <name>
git remote set-url [--push] <name> <newurl> [<oldurl>]
git remote set-url --add [--push] <name> <newurl>
git remote set-url --delete [--push] <name> <url>
git remote [-v | --verbose] show [-n] <name>…​
git remote prune [-n | --dry-run] <name>…​
git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)…​]
```

### remote 解读

remote 是 储存远程地址 的集合，

执行 <code>git remote -v</code> 可以看到 remote 列表。其中 origin，origin3 是变量名，值为远程地址。

```txt
origin  git@github.com:whosMeya/git-test.git (fetch)
origin  git@github.com:whosMeya/git-test.git (push)
origin3 git@github.com:whosMeya/git-test.git (fetch)
origin3 git@github.com:whosMeya/git-test.git (push)
```

执行 <code>git branch -avv</code> 可以看到 所有分支以及他们的对应关系。

```txt
  master                        8c4ebf5 [origin/master] first commit
  test                          8c4ebf5 [origin3/test] first commit
  test-remote-3                 8c4ebf5 [origin3/test-remote-3] first commit
  test1                         8c4ebf5 [origin3/test] first commit
* test2                         8c4ebf5 first commit
  remotes/origin/HEAD           -> origin/master
  remotes/origin/master         8c4ebf5 first commit
  remotes/origin/test-remote-3  8c4ebf5 first commit
  remotes/origin3/test          8c4ebf5 first commit
  remotes/origin3/test-remote-3 8c4ebf5 first commit
```

执行其他 git 命令时，默认操作 origin，本地分支名和远程分支名默认名字也是相同的。

可以使用 <code>git branch --set-upstream-to=remote变量名/分支名</code> 指定当前分支对应的远程分支，如 <code>git branch --set-upstream-to=origin3/test</code>

新建本地分之后，也可以使用 <code>git push -u remote变量名</code> 推送本地分支到远程新建名字相同的分支。常见 <code>git push -u origin</code>

__本地设置的remote对远程没有影响，git clone 新项目时，会新建一个remote，名字叫origin，值为拉取的远程地址__

### remote 相关常用命令

```shell
# 新增
git remote add <name> <url>

# 查看，以及详情
git remote -v

# 删除
git remote remove origin

# 查看本地分支关联的remote
git branch -vv

# 关联本地分支
git branch --set-upstream-to=<name>/<branch>

# 推送并新建远程
git push -u <name>
```

<br />

## <span id="reset">reset</span>

git reset 将 HEAD 重置为指定状态。

```txt
git reset [-q] [<tree-ish>] [--] <pathspec>…​
git reset [-q] [--pathspec-from-file=<file> [--pathspec-file-nul]] [<tree-ish>]
git reset (--patch | -p) [<tree-ish>] [--] [<pathspec>…​]
git reset [--soft | --mixed [-N] | --hard | --merge | --keep] [-q] [<commit>]
```

* --hard ：删除工作区和暂存区的修改，HEAD指向目标commit，HEAD操作前后的差异删除。
    （代码还原到目标commit，删除其他代码）
* --soft ：工作区和暂存区保持不变，HEAD指向目标commit，HEAD操作前后的差异放回暂存区。
    （指针移动，差异放回暂存区）
* --mixed（默认） ：把暂存区的修改撤销掉，放回工作区，HEAD指向目标commit，HEAD操作前后的差异放回工作区。
    （指针移动，差异和暂存区都放回工作区）

### reset 常用指令

```shell
# 撤销add
git reset
# 撤销指定文件add
git reset index.js
git reset --hard <commit>
git reset --soft <commit>
```

ps: 撤销回退可使用 git reflog 查看命令历史。工作区、暂存区、HEAD概念可查看 [Git 名词解释](https://www.cnblogs.com/whosmeya/p/12745331.html) 。

<br />

## <span id="push">push</span>

```txt
git push [--all | --mirror | --tags] [--follow-tags] [--atomic] [-n | --dry-run] [--receive-pack=<git-receive-pack>]
    [--repo=<repository>] [-f | --force] [-d | --delete] [--prune] [-v | --verbose]
    [-u | --set-upstream] [-o <string> | --push-option=<string>]
    [--[no-]signed|--signed=(true|false|if-asked)]
    [--force-with-lease[=<refname>[:<expect>]]]
    [--no-verify] [<repository> [<refspec>…​]]
```

### push 常用指令

git push <远程主机名> <本地分支名>:<远程分支名>

```shell
# 省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。
git push origin develop

# 省略本地分支名，相当于 git push origin --delete develop
git push origin :develop

# 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。
git push origin

# 如果当前分支只有一个追踪分支，那么主机名都可以省略。
git push

# 如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用git push。
git push --set-upstream origin develop
```

<br />

## <span id="tag">tag</span>

标签打在commit上，与commit同在。

```txt
git tag [-a | -s | -u <keyid>] [-f] [-m <msg> | -F <file>] [-e]
    <tagname> [<commit> | <object>]
    git tag -d <tagname>…​
    git tag [-n[<num>]] -l [--contains <commit>] [--no-contains <commit>]
    [--points-at <object>] [--column[=<options>] | --no-column]
    [--create-reflog] [--sort=<key>] [--format=<format>]
    [--[no-]merged [<commit>]] [<pattern>…​]
    git tag -v [--format=<format>] <tagname>…​
```

### tag 常用指令

```shell
# 给当前commit创建标签
git tag <tagname>
# 给指定commit创建标签
git tag <tagname> <commit>
# 给指定标签添加信息
git tag -a <tagname> -m "blablabla..."

# 查看所有标签
git tag
# 查看一个标签信息
git show <tagname>

# 推送所有标签到远程
git push origin --tags
# 推送指定标签到远程
git push origin <tagname>

# 删除一个本地标签
git tag -d <tagname>
# 删除一个远程标签
git push origin :refs/tags/<tagname>
```

<br />
