import { contextBridge, ipcRenderer } from 'electron'

const api = {
  payment: {
    getToken: async () => await ipcRenderer.invoke('payment:get-token'),
    apiGateway: async (payload) => await ipcRenderer.invoke('payment:api-gateway', payload),
    create: async (payload) => await ipcRenderer.invoke('payment:create', payload)
  },
  log: {
    info: (msg) => ipcRenderer.send('log:write', { level: 'info', message: msg }),
    error: (msg) => ipcRenderer.send('log:write', { level: 'error', message: msg }),
    warn: (msg) => ipcRenderer.send('log:write', { level: 'warn', message: msg }),
    onLogAdded: (cb) => {
      const log = (_event, payload) => cb(payload)
      ipcRenderer.on('log:update', log)
      return () => ipcRenderer.removeListener('log:update', log)
    }
  },
  electronStore: {
    set: (key, value) => ipcRenderer.send('electron-store:set', { key, value }),
    get: async (key) => await ipcRenderer.invoke('electron-store:get', key)
  }
}

contextBridge.exposeInMainWorld('api', api)
