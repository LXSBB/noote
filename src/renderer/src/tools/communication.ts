const ipcRenderer = require('electron').ipcRenderer

export const readTreeDataList = (path): Promise<unknown> => {
  return new Promise((resolve, reject): void => {
    //发布获取主进程传递的数据的事件
    ipcRenderer.on('asynchronous-reply', function (_event, arg) {
      const list = JSON.parse(JSON.stringify(arg))
      if (list) {
        resolve(list)
      } else {
        reject('err')
      }
    })
    //通知主进程获取数据
    ipcRenderer.send('async_get_tree_data', path)
  })
}
