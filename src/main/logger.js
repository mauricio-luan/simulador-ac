import { is } from '@electron-toolkit/utils'
import { createLogger, format, transports } from 'winston'
import { resolve } from 'path'
import { resourcesPath } from 'process'

const logFile = is.dev
  ? resolve('src/app.log')
  : resolve(resourcesPath, '../app.log')

const timestamp = format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss.SS' })
const metadata = format.metadata({
  fillExcept: ['timestamp', 'level', 'label', 'message']
})
const defaultLogger = format.printf((info) => {
  let log = `${info.timestamp} ${info.level} - ${info.message}`

  if (info.metadata && Object.keys(info.metadata).length > 0) {
    log += `-> ${JSON.stringify(info.metadata)}`
  }

  return log
})

export const logger = createLogger({
  format: format.combine(timestamp, metadata, defaultLogger),
  transports: [
    new transports.File({ filename: logFile }),
    new transports.Console()
  ]
})
