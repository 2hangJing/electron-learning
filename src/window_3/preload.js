const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnGetImagePath: () => ipcRenderer.invoke('fnGetImagePath')
});