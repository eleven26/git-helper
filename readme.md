### Git Helper

#### 背景
* 在模块化开发的场景下，有时候需要把所有模块切换到某一个分支，这个时候如果一个个模块去切换，使用的时间会很长，而且很繁琐，所以有了 "切换所有模块到某一个分支" 的功能
* 同样，拉取最新代码也是，如果一个个模块去拉取，耗时会很长，有时候如果遗漏也不知道
* "切换 env", 快速切换到某一个开发环境的配置
* `Artisan` 命令太多需要搜索？
* 想知道某个接口是谁写的？试试 `Api Blame`

#### 功能
* 辅助开发人员快速进行某些重复性操作

#### 系统要求
* Homestead 虚拟机
* vagrant 添加到了环境变量
* 虚拟机的 php 安装了 swoole 扩展


#### 配置
* Foundation 路径
* Homestead 路径（因为基本所有命令在 vagrant 虚拟机执行）

#### 介绍
* 切换到某一分支: 根据配置的 Foundation 路径，切换 Foundation 以及所有子模块的 `git` 仓库到某一个分支（切换之前，如果有未提交代码，会先 `git stash`，切换之后再 `git stash pop`）
* 拉取所有模块: 根据配置的 Foundation 路径，拉取 Foundation 以及所有子模块的 `git` 仓库当前分支的最新代码
* 切换 `env`: 根据配置的 Foundation 路径，切换开发环境配置（点击切换）
* Artisan 命令: 根据配置的 Foundation 路径，获取所有可用的 `artisan` 命令，并且根据标签分组，另外可以输入关键字搜索
* Api Blame: 有时候路由和 url 不是很对应，会需要搜索来查找对应的控制器和方法，使用这个功能可以直接根据输入的完整 url 来确定位于什么控制器、什么方法

#### 实现方式
* 基于 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 开发，大部分操作通过 `php` 调用系统命令执行，少数通过 `node` 调用系统命令执行。
* 命令调用方式为: 使用 [swoole](https://github.com/swoole/swoole-src) 的 `HTTP` 功能，在虚拟机里面开启 `HTTP` 服务，客户端通过接口传递需要执行的命令，`HTTP` 服务处理请求，执行命令，返回结果

#### FAQ
* 为什么某一个模块的代码没有切换到某一个分支？一般是代码冲突了，需要自行解决冲突
