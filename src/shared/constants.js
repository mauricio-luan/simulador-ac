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
  SEND_TO_PRINTER: 'SEND_TO_PRINTER',
  ABORT: 'ABORT'
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

export const dialExtPaymentTypeOptions = Object.freeze({
  CARD: '1',
  CASH: '2',
  DIGITAL_WALLET: '8'
})

export const dialExtCardTypes = Object.freeze({
  ANY: '0',
  CREDIT: '1',
  DEBIT: '2',
  VOUCHER: '3'
})

export const dialExtFinanceTypes = Object.freeze({
  ANY: '0',
  CASH: '1',
  ADMIN_CREDIT: '2',
  SHOPKEEPER_CREDIT: '3',
  PREDATED: '4',
  FORCED_PREDATED: '5'
})
export const dialExtOperations = Object.freeze({
  CRT: 'CRT',
  CNC: 'CNC'
})

export const dialTransactionTypes = Object.freeze({
  CREDIT_FULL_PAYMENT: '10',
  CREDIT_FINANCED_NO_FEES: '11',
  CREDIT_FINANCED_WITH_FEES: '12',
  DEBIT_FULL_PAYMENT: '20',
  PREDATED_DEBIT: '21',
  FINANCED_DEBIT: '22',
  PIX: '26',
  VOUCHER: '60'
})
