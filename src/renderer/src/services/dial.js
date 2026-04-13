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

export function parseTefDial({
  value,
  paymentMethod,
  paymentType,
  paymentMethodSubType
}) {
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
      payload.paymentType = dialExtCardTypes.DEBIT
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
  }

  return payload
}
//   return `
// 000-000 = ${payload.command}
// 001-000 = ${payload.correlationId}
// 003-000 = ${payload.value}
// 004-000 = 0
// 716-000 = ${payload.socialReason}
// 731-000 = ${payload.paymentType}
// 732-000 = ${payload.paymentMethodSubType ?? ''}
// 749-000 = ${payload.paymentMethod}
// 999-999 = 0
// `
// }
