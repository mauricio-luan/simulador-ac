import { contextBridge, ipcRenderer } from 'electron'

const payment = {
  getToken: async () => await ipcRenderer.invoke('payment:get-gateway-token'),
  gateway: async (payload) =>
    await ipcRenderer.invoke('payment:gateway', payload),
  localhost: async (payload) =>
    await ipcRenderer.invoke('payment:localhost', payload),
  apiStatus: async () => await ipcRenderer.invoke('api-status')
}

const log = {
  info: (msg) => ipcRenderer.send('log:write', { level: 'info', message: msg }),
  error: (msg) =>
    ipcRenderer.send('log:write', { level: 'error', message: msg }),
  warn: (msg) => ipcRenderer.send('log:write', { level: 'warn', message: msg }),
  onLogAdded: (cb) => {
    const log = (_event, payload) => cb(payload)
    ipcRenderer.on('log:update', log)
    return () => ipcRenderer.removeListener('log:update', log)
  }
}

const electronStore = {
  set: (key, value) => ipcRenderer.send('electron-store:set', { key, value }),
  get: async (key) => await ipcRenderer.invoke('electron-store:get', key)
}

contextBridge.exposeInMainWorld('api', {
  payment,
  log,
  electronStore
})
