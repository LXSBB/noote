import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as fs from 'fs'
import * as path from 'path'
import { getFilesAndFoldersInDir } from '../utils/readFolder'
/*
 * 创建窗口
 * */
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

/*
 * 初始化并准备创建浏览器窗口时
 * */
app.whenReady().then(() => {
  // 创建用户id
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()
  app.on('activate', function () {
    // 保持窗口只有一个
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当窗口全部关闭时，关闭应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('async_get_tree_data', function (event, arg) {
  const list = getFilesAndFoldersInDir(path.join(arg))
  if (list) {
    //传给渲染进程的数据
    event.sender.send('asynchronous-reply', list)
  } else {
    event.sender.send('asynchronous-reply', 'err')
  }
})
