import axios from 'axios'
import { logger } from './logger'
import electronStore from '../plugins/electron-store'
import { emitter } from './server'

export function localhostPayment(payload) {
  const endpoint = 'http://localhost:6060/Client/request'

  return new Promise((resolve, reject) => {
    if (!payload) {
      reject(new Error('Payload vazio'))
      return
    }

    axios
      .post(endpoint, payload)
      .then(() => {
        pooling()
          .then((response) => {
            resolve(response.data)
          })
          .catch((e) => reject(e))
      })
      .catch((e) => reject(e))
  })
}

export function getTokenApiGateway() {
  const payload = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD
  }

  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_OAUTH_URL, payload)
      .then((response) => {
        resolve(response.data?.AuthenticationResult?.IdToken)
      })
      .catch((e) => reject(e))
  })
}

export function gatewayPayment(payload) {
  const token = electronStore.get('IdToken', false)
  let timeoutId = null

  return new Promise((resolve, reject) => {
    if (!payload || !token) {
      reject(new Error('Payload ou/e token vazio(s)'))
      return
    }

    const onResponse = (data) => {
      clearTimeout(timeoutId)
      resolve(data)
    }

    emitter.once('apigateway:response', onResponse)

    axios
      .post(import.meta.env.VITE_API_GATEWAY_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        timeoutId = setTimeout(() => {
          emitter.off('apigateway:response', onResponse)
          reject(new Error('Time out'))
        })
      }, 60000)
      .catch((err) => {
        reject(err)
      })
  })
}

const pooling = async () => {
  let limiteTentativas = 30
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  try {
    logger.info('Aguardando response...')

    for (let tentativas = 0; tentativas < limiteTentativas; tentativas++) {
      try {
        const response = await axios.get(
          'http://localhost:6060/Client/response'
        )
        if (response.status === 200) return response
      } catch (innerError) {
        console.warn('Erro ou sem operacao:', innerError.message)
      }
      await sleep(2000)
    }

    throw new Error('Timeout: Limite de tentativas excedido.')
  } catch (error) {
    console.error('Falha no pooling:', error)
    throw error
  }
}
