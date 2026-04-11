export const Fields = Object.freeze({
  COMMAND: 'command',
  VALUE: 'value',
  ID_PAYER: 'idPayer',
  PAYMENT_METHOD: 'paymentMethod',
  PAYMENT_TYPE: 'paymentType',
  PAYMENT_METHOD_SUB_TYPE: 'paymentMethodSubType',
  INSTALLMENTS: 'installments',
  DOCUMENT_NUMBER: 'documentNumber',
  SERVICE: 'service',
  PAYMENT_DATE: 'paymentDate',
  EMAIL: 'email',
  PASSWORD: 'password',
  REMOTE_ORDER: 'remoteOrder',
  CALLBACK_URL: 'callbackUrl',
  CNPJ_MULTI_EC: 'cnpjMultiEc'
})

export const CommandType = Object.freeze({
  PAYMENT: 'PAYMENT',
  ADMIN: 'ADMIN',
  CANCELLMENT: 'CANCELLMENT',
  SERVICE: 'SERVICE',
  INPUT_CPF: 'INPUT_CPF',
  INPUT_CNPJ: 'INPUT_CNPJ',
  SEND_TO_PRINTER: 'SEND_TO_PRINTER'
})

export const PaymentMethod = Object.freeze({
  CARD: 'CARD',
  CASH: 'CASH',
  PIX: 'PIX',
  WALLET: 'WALLET',
  TYPED: 'TYPED',
  LINK: 'LINK',
  RECURRENT: 'RECURRENT',
  PIX_LINK: 'PIX_LINK',
  GENERIC_LINK: 'GENERIC_LINK',
  CREDIARY: 'CREDIARY'
})

export const PaymentType = Object.freeze({
  CASH: 'CASH',
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
  VOUCHER: 'VOUCHER'
})

export const PaymentMethodSubType = Object.freeze({
  FULL_PAYMENT: 'FULL_PAYMENT',
  PREDATED_DEBIT: 'PREDATED_DEBIT',
  FINANCED_DEBIT: 'FINANCED_DEBIT',
  FINANCED_NO_FEES: 'FINANCED_NO_FEES',
  FINANCED_WITH_FEES: 'FINANCED_WITH_FEES',
  RECURRENT: 'RECURRENT',
  FULL_PAYMENT_BANRICOMPRAS: 'FULL_PAYMENT_BANRICOMPRAS'
})

export const service = Object.freeze({
  MOBILE_CREDIT: 'MOBILE_CREDIT'
})

export const statusTransaction = Object.freeze({
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  ABORTED: 'ABORTED',
  DONE: 'DONE',
  UNAUTHORIZED: 'UNAUTHORIZED'
})

export const integrationModes = Object.freeze({
  LOCALHOST: 'localhost',
  GATEWAY: 'gateway'
})

export const apiGatewayPayload = Object.freeze({
  TYPE: 'type',
  ORIGIN: 'origin',
  CALLBACK_URL: 'callbackUrl',
  CORRELATION_ID: 'correlationId',
  FLOW: 'flow',
  AUTOMATION_NAME: 'automationName',
  RECEIVER: 'receiver',
  COMPANY_ID: 'companyId',
  STORE_ID: 'storeId',
  TERMINAL_ID: 'terminalId'
})

export const Type = Object.freeze({
  INPUT: 'INPUT',
  INTERNAL_INPUT: 'INTERNAL_INPUT',
  SEND_TO_PRINTER: 'SEND_TO_PRINTER'
})

export const Flow = Object.freeze({
  SYNC: 'SYNC',
  ASYNC: 'ASYNC'
})
