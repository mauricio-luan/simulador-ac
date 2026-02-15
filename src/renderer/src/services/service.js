import { Fields, CommandType, PaymentMethod, apiGatewayPayload } from '@shared/constants/Fields'
import store from '@renderer/store/store'

export async function definePaymentType({ typeOrMethod, value, integrationMode }) {
  const logLabel = '[definePaymentType]'
  window.api.log.info(`${logLabel} -> IntegrationMode: ${integrationMode}`)

  if (store.state.integrationMode === 'localhost') {
    return await localhostPayment({ typeOrMethod, value })
  } else {
    return await gatewayPayment({ typeOrMethod, value })
  }
}

const localhostPayment = async ({ typeOrMethod, value }) => {
  const logLabel = '[localhostPayment]'
  try {
    const payload = {
      [Fields.COMMAND]: CommandType.PAYMENT,
      [Fields.VALUE]: value.toFixed(2)
    }

    if (Object.values(PaymentMethod).includes(typeOrMethod)) {
      payload[Fields.PAYMENT_METHOD] = typeOrMethod
    } else {
      payload[Fields.PAYMENT_METHOD] = PaymentMethod.CARD
      payload[Fields.PAYMENT_TYPE] = typeOrMethod
    }

    window.api.log.info(`${logLabel} -> Payload: ${JSON.stringify(payload)}`)

    const response = await window.api.payment.create(payload)
    return response
  } catch (err) {
    window.api.log.error(`${logLabel} -> ${err}`)
    throw err
  }
}

const gatewayPayment = async ({ typeOrMethod, value }) => {
  const logLabel = '[gatewayPayment]'
  try {
    const payload = {
      [apiGatewayPayload.TYPE]: 'INPUT',
      [apiGatewayPayload.ORIGIN]: 'PDV',
      data: {
        [apiGatewayPayload.CALLBACK_URL]: '',
        [apiGatewayPayload.CORRELATION_ID]: 'aqui eu vou meter algo',
        [apiGatewayPayload.FLOW]: 'SYNC',
        [apiGatewayPayload.AUTOMATION_NAME]: '',
        receiver: {
          [apiGatewayPayload.COMPANY_ID]: '',
          [apiGatewayPayload.STORE_ID]: '',
          [apiGatewayPayload.TERMINAL_ID]: ''
        },
        message: {
          [Fields.COMMAND]: CommandType.PAYMENT,
          [Fields.VALUE]: value.toFixed(2)
        }
      }
    }

    if (Object.values(PaymentMethod).includes(typeOrMethod)) {
      payload.data.message[Fields.PAYMENT_METHOD] = typeOrMethod
    } else {
      payload.data.message[Fields.PAYMENT_METHOD] = PaymentMethod.CARD
      payload.data.message[Fields.PAYMENT_TYPE] = typeOrMethod
    }

    window.api.log.info(`${logLabel} -> Payload: ${JSON.stringify(payload)}`)
    const response = await window.api.payment.apiGateway(payload)
    return response
  } catch (err) {
    window.api.log.error(`${logLabel} -> ${err}`)
    throw err
  }
}
