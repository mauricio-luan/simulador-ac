import axios from 'axios'
import { pooling } from './pooling'
import { logger } from '@/main/log/logger'

export const createPayment = async (payload) => {
  const logLabel = '[createPayment]'
  try {
    if (!payload || payload == undefined) throw new Error('Payload vazio.')

    // const url =
    //   integrationMode === 'localhost' ? 'http://localhost:6060/Client/request' : 'url de prod'

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
