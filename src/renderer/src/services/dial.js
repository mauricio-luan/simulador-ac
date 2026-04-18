import { v4 as uuid } from 'uuid'
import {
  dialExtCardTypes,
  dialExtOperations,
  dialTransactionTypes,
  dialExtPaymentTypeOptions,
  PaymentMethod,
  PaymentType,
  PaymentMethodSubType
} from '../../../shared/constants'

export function parseTefDial(
  value,
  paymentMethod,
  paymentType,
  paymentMethodSubType
) {
  //debug, apagar depois
  window.api.log.info(
    `value: ${value}, paymentMethod: ${paymentMethod}, paymentType: ${paymentType}, paymentMethodSubType: ${paymentMethodSubType}`
  )
  const payload = new Object()

  const formattedValue = value.toString().replace(/[.,]/g, '')

  payload.value = formattedValue
  payload.command = dialExtOperations.CRT
  payload.correlationId = uuid()
  payload.socialReason = 'Simulador AC'

  switch (paymentMethod) {
    case PaymentMethod.CARD:
      payload.paymentMethod = dialExtPaymentTypeOptions.CARD
      break
    case PaymentMethod.PIX:
      payload.paymentMethod = dialExtPaymentTypeOptions.DIGITAL_WALLET
      break
  }

  switch (paymentType) {
    case PaymentType.CREDIT:
      payload.paymentType = dialExtCardTypes.CREDIT
      break
    case PaymentType.DEBIT:
      if (payload.paymentMethod === dialExtPaymentTypeOptions.DIGITAL_WALLET) {
        payload.paymentType = dialExtCardTypes.ANY
      } else {
        payload.paymentType = dialExtCardTypes.DEBIT
      }
      break
  }

  if (paymentMethodSubType) {
    switch (paymentMethodSubType) {
      case PaymentMethodSubType.FULL_PAYMENT:
        if (payload.paymentType === dialExtCardTypes.CREDIT) {
          payload.paymentMethodSubType =
            dialTransactionTypes.CREDIT_FULL_PAYMENT
        } else {
          payload.paymentMethodSubType = dialTransactionTypes.DEBIT_FULL_PAYMENT
        }
        break
      case PaymentMethodSubType.FINANCED_DEBIT:
        payload.paymentMethodSubType = dialTransactionTypes.FINANCED_DEBIT
        break
      case PaymentMethodSubType.PREDATED_DEBIT:
        payload.paymentMethodSubType = dialTransactionTypes.PREDATED_DEBIT
        break
      case PaymentMethodSubType.FINANCED_NO_FEES:
        payload.paymentMethodSubType =
          dialTransactionTypes.CREDIT_FINANCED_NO_FEES
        break
      case PaymentMethodSubType.FINANCED_WITH_FEES:
        payload.paymentMethodSubType =
          dialTransactionTypes.CREDIT_FINANCED_WITH_FEES
        break
    }
  } else {
    payload.paymentMethodSubType = '1'
  }

  return payload
}
