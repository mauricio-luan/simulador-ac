import { v4 as uuid } from 'uuid'
import { Fields, CommandType, PaymentMethod, apiGatewayPayload } from '@shared/constants/Fields'
import store from '../store/store'

export async function definePaymentType({ typeOrMethod, value }) {
  const logLabel = '[definePaymentType]'
  window.api.log.info(`${logLabel} -> IntegrationMode: ${store.state.integrationMode}`)

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
  const { callbackUrl, automationName, companyId, storeId, terminalId } =
    store.getters.apiGatewayConfig
  try {
    const payload = {
      [apiGatewayPayload.TYPE]: 'INPUT',
      [apiGatewayPayload.ORIGIN]: 'PDV',
      data: {
        [apiGatewayPayload.CALLBACK_URL]: `${callbackUrl}/response`,
        [apiGatewayPayload.CORRELATION_ID]: uuid(),
        [apiGatewayPayload.FLOW]: 'SYNC',
        [apiGatewayPayload.AUTOMATION_NAME]: automationName,
        receiver: {
          [apiGatewayPayload.COMPANY_ID]: companyId,
          [apiGatewayPayload.STORE_ID]: storeId,
          [apiGatewayPayload.TERMINAL_ID]: terminalId
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

    window.api.log.info(`${logLabel} -> payload: ${JSON.stringify(payload)}`)
    const response = await window.api.payment.apiGateway(payload)
    return response
  } catch (err) {
    window.api.log.error(`${logLabel} -> ${err}`)
    throw err
  }
}
