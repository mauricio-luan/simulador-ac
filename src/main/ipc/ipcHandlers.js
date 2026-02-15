import { BrowserWindow, ipcMain } from 'electron'
import { createPayment } from '@/main/services/services'
import { logger } from '../log/logger'
import electronStore from '../../plugins/electron-store'

export function registerIpcHandlers() {
  ipcMain.handle('payment:create', async (_, payload) => {
    return await createPayment(payload)
  })

  ipcMain.on('log:write', (_, { level, message }) => {
    logger.log({ level, message })
  })

  ipcMain.on('electron-store:set', (_, { key, value }) => {
    electronStore.set(key, value)
    logger.info('[electron-store] -> Chave criada / atualizada', { key, value })
  })

  ipcMain.handle('electron-store:get', async (_, key) => {
    const response = electronStore.get(key, false)
    if (!response) logger.warn(`[electron-store] -> Chave ${key} não encontrada no electron-store`)
    return response
  })

  logger.on('data', (logData) => {
    BrowserWindow.getFocusedWindow().webContents.send('log:update', logData)
  })
}
