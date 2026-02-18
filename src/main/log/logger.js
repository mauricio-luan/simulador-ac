import { is } from '@electron-toolkit/utils'
import { createLogger, format, transports } from 'winston'
import { resolve } from 'path'
import { resourcesPath } from 'process'

const { combine, timestamp, label, printf, metadata } = format

const logFile = is.dev ? resolve('src/app.log') : resolve(resourcesPath, '../app.log')

const defaultLogger = printf((info) => {
  let log = `${info.timestamp} ${info.level} [${info.label}] - ${info.message}`

  if (info.metadata && Object.keys(info.metadata).length > 0) {
    log += `-> ${JSON.stringify(info.metadata)}`
  }

  return log
})

export const logger = createLogger({
  format: combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss.SSS' }),
    label({ label: 'APP' }),
    metadata({ fillExcept: ['timestamp', 'level', 'label', 'message'] }),
    defaultLogger
  ),
  transports: [new transports.File({ filename: logFile }), new transports.Console()]
})
