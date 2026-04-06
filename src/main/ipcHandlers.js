import axios from 'axios'
import electronStore from '../plugins/electron-store'
import { BrowserWindow, ipcMain } from 'electron'
import { logger } from './logger'
import {
  createPayment,
  createPaymentApiGateway,
  getTokenApiGateway
} from './services'

export function registerIpcHandlers() {
  logger.on('data', (logData) => {
    BrowserWindow.getFocusedWindow().webContents.send('log:update', logData)
  })

  ipcMain.handle('payment:get-gateway-token', async () => {
    return await getTokenApiGateway()
  })

  ipcMain.handle('payment:localhost', async (_, payload) => {
    return await createPayment(payload)
  })

  ipcMain.handle('payment:gateway', async (_, payload) => {
    return await createPaymentApiGateway(payload)
  })

  ipcMain.on('log:write', (_, { level, message }) => {
    logger.log({ level, message })
  })

  ipcMain.on('electron-store:set', (_, { key, value }) => {
    electronStore.set(key, value)
    logger.info(
      `[electron-store] -> atualizado: ${key}: ${JSON.stringify(value)}`
    )
  })

  ipcMain.handle('electron-store:get', (_, key) => {
    const response = electronStore.get(key, false)
    if (!response) {
      logger.warn(`[electron-store] -> Chave ${key} nao encontrada`)
      return
    }
    return response
  })

  ipcMain.handle('api-status', async () => {
    const response = await axios.get('http://localhost:3000/health')
    return response.status === 200
  })
}
