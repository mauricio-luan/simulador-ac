import axios from 'axios'
import { pooling } from './pooling'
import { logger } from '@/main/log/logger'
import electronStore from '../../plugins/electron-store'

export const createPayment = async (payload) => {
  const logLabel = '[createPayment]'
  try {
    if (!payload || payload == undefined) throw new Error('Payload vazio.')

    await axios.post('http://localhost:6060/Client/request', payload)
    const response = await pooling()

    logger.info('response -> ', response.data)
    return response.data
  } catch (err) {
    if (err.response) {
      logger.error(`${logLabel} -> ${err.response.status} - ${err.response.data.message}`)
      throw new Error(err.response.data.message)
    }
    if (err.request) {
      logger.error(`${logLabel} -> ${err.code}`)
      throw new Error('erro servidor')
    }
    logger.error(`${logLabel} -> ${err.message}`)
    throw new Error(err.message)
  }
}

export const getTokenApiGateway = async () => {
  try {
    const payload = {
      clientId: import.meta.env.VITE_CLIENT_ID,
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD
    }

    const response = await axios.post(import.meta.env.VITE_OAUTH_URL, payload)
    return response.data.AuthenticationResult.IdToken
  } catch (err) {
    logger.error(`[getTokenApiGateway] -> ${err.message}`)
    throw err
  }
}

export const createPaymentApiGateway = async (payload) => {
  const logLabel = '[createPaymentApiGateway]'
  try {
    if (!payload || payload == undefined) throw new Error('Payload vazio.')

    const token = electronStore.get('IdToken', false)

    await axios.post(`${import.meta.env.VITE_API_GATEWAY_URL}/cloud-notification/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // const response = await poolingGateway()

    // logger.info('response -> ', response.data)
    // return response.data
  } catch (err) {
    if (err.response) {
      logger.error(`${logLabel} -> ${err.response.status} - ${err.response.data.message}`)
      throw new Error(err.response.data.message)
    }
    if (err.request) {
      logger.error(`${logLabel} -> ${err.code}`)
      throw new Error('erro servidor')
    }
    logger.error(`${logLabel} -> ${err.message}`)
    throw new Error(err.message)
  }
}
