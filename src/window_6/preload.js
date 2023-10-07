const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnOpenMessageDialog: () => ipcRenderer.invoke('fnOpenMessageDialog'),
    fnOpenDialog: () => ipcRenderer.invoke('fnOpenDialog'),
    fnOpenSaveDialog: () => ipcRenderer.invoke('fnOpenSaveDialog'),
});

