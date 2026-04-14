import store from '../store/store'
import { v4 as uuid } from 'uuid'
import {
  CommandType,
  Type,
  Flow,
  integrationModes
} from '../../../shared/constants'
import { parseTefDial } from './dial'

export async function handlePayment(payload) {
  switch (store.state.integrationMode) {
    case integrationModes.LOCALHOST:
      return await localhostPayment(payload)
    case integrationModes.GATEWAY:
      return await gatewayPayment(payload)
    case integrationModes.DIAL:
      return await dialPayment(payload)
  }
}

export async function handleAbort() {
  return store.state.integrationMode === 'localhost'
    ? await window.api.payment.abort()
    : await gatewayPayment({ command: CommandType.ABORT })
}

async function localhostPayment({
  value,
  paymentMethod,
  paymentType,
  paymentMethodSubType
}) {
  try {
    const payload = {
      command: CommandType.PAYMENT,
      value,
      paymentMethod,
      paymentType,
      paymentMethodSubType
    }

    window.api.log.info(
      `[localhostPayment] -> Payload: ${JSON.stringify(payload)}`
    )

    return await window.api.payment.localhost(payload)
  } catch (err) {
    window.api.log.error(`[localhostPayment] -> ${err}`)
    throw err
  }
}

async function gatewayPayment({
  command = CommandType.PAYMENT,
  value,
  paymentMethod,
  paymentType,
  paymentMethodSubType
}) {
  const { callbackUrl, automationName, companyId, storeId, terminalId } =
    store.getters.apiGatewayConfig

  try {
    const payload = {
      type: Type.INPUT,
      origin: 'Simulador AC',
      data: {
        callbackUrl,
        correlationId: uuid(),
        flow: Flow.SYNC,
        automationName,
        receiver: {
          companyId,
          storeId,
          terminalId
        },
        message: {
          command,
          value,
          paymentMethod,
          paymentType,
          paymentMethodSubType
        }
      }
    }

    window.api.log.info(
      `[gatewayPayment] -> Payload: ${JSON.stringify(payload)}`
    )
    return await window.api.payment.gateway(payload)
  } catch (err) {
    window.api.log.error(`[gatewayPayment] -> ${err}`)
    throw err
  }
}

async function dialPayment({
  value,
  paymentMethod,
  paymentType,
  paymentMethodSubType
}) {
  try {
    const parsedData = parseTefDial(
      value,
      paymentMethod,
      paymentType,
      paymentMethodSubType
    )

    const payload = `
  000-000=${parsedData.command}
  001-000=${parsedData.correlationId}
  003-000=${parsedData.value}
  004-000=0
  730-000=1
  716-000=${parsedData.socialReason}
  749-000=${parsedData.paymentMethod}
  731-000=${parsedData.paymentType}
  732-000=${parsedData.paymentMethodSubType}
  999-999=0
  `
    window.api.log.info(`[dialPayment] -> Payload: ${payload}`)
    return await window.api.payment.dial(payload)
  } catch (error) {
    window.api.log.error(`[dialPayment] -> ${error}`)
  }
}
