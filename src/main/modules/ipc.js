import axios from 'axios'
import electronStore from '../../plugins/electron-store'
import { BrowserWindow, ipcMain } from 'electron'
import { logger } from './logger'
import {
  localhostPayment,
  gatewayPayment,
  getTokenApiGateway,
  abortPayment
} from './services'

export function registerIPC() {
  logger.on('data', (logData) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()

    const win = focusedWindow || BrowserWindow.getAllWindows()[0]

    if (win && !win.isDestroyed()) {
      win.webContents.send('log:update', logData)
    }
  })

  ipcMain.handle('payment:get-gateway-token', async () => {
    try {
      return await getTokenApiGateway()
    } catch (error) {
      logger.error(
        `[IPC] Erro em 'payment:get-gateway-token': ${error.message}`
      )
      throw error
    }
  })

  ipcMain.handle('payment:localhost', async (_, payload) => {
    try {
      return await localhostPayment(payload)
    } catch (error) {
      logger.error(`[IPC] Erro em 'payment:localhost': ${error.message}`)
      throw error
    }
  })

  ipcMain.handle('payment:gateway', async (_, payload) => {
    try {
      return await gatewayPayment(payload)
    } catch (error) {
      logger.error(`[IPC] Erro em 'payment:gateway': ${error.message}`)
      throw error
    }
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
    const response = electronStore.get(key)
    if (response === undefined) {
      logger.warn(`[electron-store] -> Chave ${key} nao encontrada`)
      return null
    }
    return response
  })

  ipcMain.handle('api-status', async () => {
    try {
      const response = await axios.get('http://localhost:3000/health')
      return response.status === 200
    } catch (error) {
      logger.error(`[IPC] Verificação de 'api-status' falhou: ${error.message}`)
      return false
    }
  })

  ipcMain.handle('payment-abort', async () => {
    try {
      return await abortPayment()
    } catch (error) {
      logger.error(
        `[IPC] Erro ao enviar comando de abort: ${error.message || error}`
      )
      throw error
    }
  })
}
