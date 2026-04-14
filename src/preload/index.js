import { contextBridge, ipcRenderer } from 'electron'

const payment = {
  abort: () => ipcRenderer.invoke('payment-abort'),
  apiStatus: () => ipcRenderer.invoke('api-status'),
  getToken: () => ipcRenderer.invoke('payment:get-gateway-token'),
  gateway: (payload) => ipcRenderer.invoke('payment:gateway', payload),
  localhost: (payload) => ipcRenderer.invoke('payment:localhost', payload),
  dial: (payload) => ipcRenderer.invoke('payment:dial', payload)
}

const log = {
  info: (msg) => ipcRenderer.send('log:write', { level: 'info', message: msg }),
  warn: (msg) => ipcRenderer.send('log:write', { level: 'warn', message: msg }),
  error: (msg) =>
    ipcRenderer.send('log:write', { level: 'error', message: msg }),
  onLogAdded: (cb) => {
    const log = (_event, payload) => cb(payload)
    ipcRenderer.on('log:update', log)
    return () => ipcRenderer.removeListener('log:update', log)
  }
}

const electronStore = {
  set: (key, value) => ipcRenderer.send('electron-store:set', { key, value }),
  get: (key) => ipcRenderer.invoke('electron-store:get', key)
}

contextBridge.exposeInMainWorld('api', {
  payment,
  log,
  electronStore
})
