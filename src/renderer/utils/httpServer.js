import store from '../store'
import {execute} from '../commands'
import {homesteadPath, vagrantPath} from './index'

// 使用  node 的 exec 执行启动 http server 的命令
// 后续命令的执行通过 http server 执行 vagrant 虚拟机里面的命令

function changeExec () {
  store.dispatch('changeExec', require('child_process').exec)
}

function start () {
  handle(() => {
    startServer()
  })
}

function startServer () {
  let prefix = vagrantPrefix()
  execute(`${prefix} 'php ~/bin/swoole_server.php'`, { cwd: homesteadPath() }, output => {
    console.groupCollapsed('start server')
    console.log(output)
    console.groupEnd()
  })
}

function handle (callback) {
  changeExec()
  callback()
  restoreExec()
}

function restoreExec () {
  store.dispatch('changeExec', require('../utils/request').exec)
}

function vagrantPrefix () {
  let vagrant = vagrantPath()
  return `${vagrant} ssh -- -t `
}

export {
  start,
  handle
}
