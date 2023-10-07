const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnChangeCount: renderCallback => ipcRenderer.on('fnChangeCount', renderCallback)
});