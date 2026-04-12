import store from '../store/store'
import { v4 as uuid } from 'uuid'
import { CommandType, Type, Flow } from '../../../shared/constants'

export async function definePaymentType(payload) {
  return store.state.integrationMode === 'localhost'
    ? await localhostPayment(payload)
    : await gatewayPayment(payload)
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
