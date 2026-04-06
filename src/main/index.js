import { app, BrowserWindow } from 'electron'
import { createWindow } from './window'
import { registerIpcHandlers } from './ipcHandlers'
import { startServer } from './server'

app.whenReady().then(() => {
  createWindow()
  registerIpcHandlers()
  startServer()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
