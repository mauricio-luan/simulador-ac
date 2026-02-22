import express from 'express'
import EventEmitter from 'events'
import ngrok from '@ngrok/ngrok'
import electronStore from '../../plugins/electron-store'
import { logger } from '../log/logger'

let server = null
const PORT = 3000

export const emitter = new EventEmitter()

export async function startServer() {
  if (server) return

  server = express()
  server.use(express.json())

  server.post('/response', (req, res) => {
    emitter.emit('apigateway:response', req.body)
    res.sendStatus(200)
  })

  server.listen(PORT, () => {
    logger.info(
      `[EXPRESS] -> servidor para recebimento do payload de transacao iniciado na porta ${PORT}`
    )
  })

  const listener = await ngrok.forward({
    addr: PORT,
    authtoken: import.meta.env.VITE_NGROK_AUTHTOKEN
  })
  logger.info(`[EXPRESS] -> baseUrl exportada para uso como callbackUrl: ${listener.url()}`)

  const apiGatewayConfig = electronStore.get('apiGatewayConfig', false)
  if (!apiGatewayConfig) {
    electronStore.set('apiGatewayConfig', {
      callbackUrl: listener.url(),
      automationName: null,
      companyId: null,
      storeId: null,
      terminalId: null
    })
  } else {
    electronStore.set('apiGatewayConfig', { ...apiGatewayConfig, callbackUrl: listener.url() })
  }
}
