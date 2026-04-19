import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'
import path from 'path'

export function createWindow() {
  const preloadPath = is.dev
    ? path.resolve('src/preload/index.js')
    : path.join(__dirname, '../preload/index.mjs')

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    show: false,
    center: true,
    title: 'Simulador AC',
    autoHideMenuBar: true,
    webPreferences: {
      preload: preloadPath,
      sandbox: false
    }
  })

  win.on('ready-to-show', () => win.show())

  if (is.dev) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}
