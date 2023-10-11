const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnQuit: () => ipcRenderer.send('fnQuit'),
    fnModifyPosition: (offsetX, offsetY) => ipcRenderer.send('fnModifyPosition', offsetX, offsetY)
});

