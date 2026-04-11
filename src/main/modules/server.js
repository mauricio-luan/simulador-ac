import express from 'express'
import EventEmitter from 'events'
import ngrok from '@ngrok/ngrok'
import electronStore from '../../plugins/electron-store'

let server = null
const PORT = 3000

export const emitter = new EventEmitter()

export async function startServer() {
  if (server) return

  server = express()
  server.use(express.json())

  server.listen(PORT, () => {
    console.log(
      `[EXPRESS] -> servidor para recebimento do payload de transacao iniciado na porta ${PORT}`
    )
  })

  server.get('/health', (req, res) => {
    res.sendStatus(200)
  })

  server.post('/response', (req, res) => {
    emitter.emit('apigateway:response', req.body)
    res.sendStatus(200)
  })

  const listener = await ngrok.forward({
    addr: PORT,
    authtoken: import.meta.env.VITE_NGROK_AUTHTOKEN
  })
  console.log(
    `[EXPRESS] -> baseUrl exportada para uso como callbackUrl: ${listener.url()}`
  )

  const apiGatewayConfig = electronStore.get('apiGatewayConfig', false)
  electronStore.set('apiGatewayConfig', {
    ...(apiGatewayConfig ? apiGatewayConfig : {}),
    callbackUrl: listener.url() + '/response'
  })
}
