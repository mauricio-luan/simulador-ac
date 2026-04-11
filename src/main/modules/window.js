import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'
import path from 'path'

export function createWindow() {
  const preloadPath = is.dev
    ? path.resolve('src/preload/index.js')
    : path.resolve('out/preload/index.js')

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    show: false,
    webPreferences: {
      preload: preloadPath,
      sandbox: false
    }
  })

  win.on('ready-to-show', () => win.show())

  if (is.dev) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(path.resolve('src/renderer/dist/index.html'))
  }
}
