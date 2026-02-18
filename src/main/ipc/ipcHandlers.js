import { BrowserWindow, ipcMain } from 'electron'
import { createPayment, createPaymentApiGateway, getTokenApiGateway } from '../services/services'
import { logger } from '../log/logger'
import electronStore from '../../plugins/electron-store'

export function registerIpcHandlers() {
  ipcMain.handle('payment:get-token', async () => {
    return await getTokenApiGateway()
  })

  ipcMain.handle('payment:create', async (_, payload) => {
    return await createPayment(payload)
  })

  ipcMain.handle('payment:api-gateway', async (_, payload) => {
    return await createPaymentApiGateway(payload)
  })

  ipcMain.on('log:write', (_, { level, message }) => {
    logger.log({ level, message })
  })

  ipcMain.on('electron-store:set', (_, { key, value }) => {
    electronStore.set(key, value)
    logger.info(`[electron-store] -> atualizado: ${key}: ${JSON.stringify(value)}`)
  })

  ipcMain.handle('electron-store:get', (_, key) => {
    const response = electronStore.get(key, false)
    if (!response) {
      logger.warn(`[electron-store] -> Chave ${key} não encontrada`)
      throw new Error(`Chave ${key} não encontrada`)
    }
    return response
  })

  logger.on('data', (logData) => {
    BrowserWindow.getFocusedWindow().webContents.send('log:update', logData)
  })
}
