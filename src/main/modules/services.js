import axios from 'axios'
import electronStore from '../../plugins/electron-store'
import { logger } from './logger'
import { emitter } from './server'

export function localhostPayment(payload) {
  if (!payload) {
    return Promise.reject(new Error('Payload vazio'))
  }

  return axios
    .post('http://localhost:6060/Client/request', payload)
    .then(() => pooling())
}

export function getTokenApiGateway() {
  const payload = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD
  }

  return axios
    .post(import.meta.env.VITE_OAUTH_URL, payload)
    .then((res) => res.data?.AuthenticationResult?.IdToken)
}

export function gatewayPayment(payload) {
  const token = electronStore.get('IdToken', false)

  return new Promise((resolve, reject) => {
    if (!payload || !token) {
      reject(new Error('Payload ou/e token vazio(s)'))
      return
    }

    let timeoutId = null

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
        }, 40000)
      })
      .catch((err) => {
        emitter.off('apigateway:response', onResponse)
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
        if (response.status === 200) return response.data
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
