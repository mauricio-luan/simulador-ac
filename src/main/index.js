import { app, BrowserWindow } from 'electron'
import { createWindow } from './modules/window'
import { registerIPC } from './modules/ipc'
import { startServer } from './modules/server'

app.whenReady().then(async () => {
  registerIPC()
  await startServer()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
