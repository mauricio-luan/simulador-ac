import axios from 'axios'
import { logger } from '@/main/log/logger'

export const pooling = async () => {
  let limiteTentativas = 30
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  try {
    logger.info('Aguardando response...')

    for (let tentativas = 0; tentativas < limiteTentativas; tentativas++) {
      try {
        const response = await axios.get('http://localhost:6060/Client/response')
        if (response.status === 200) return response
      } catch (innerError) {
        console.warn('Erro ou sem operação:', innerError.message)
      }
      await sleep(2000)
    }

    throw new Error('Timeout: Limite de tentativas excedido.')
  } catch (error) {
    console.error('Falha no pooling:', error)
    throw error
  }
}
