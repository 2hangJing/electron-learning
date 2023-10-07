const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnOpenRightMenu: () => ipcRenderer.send('fnOpenRightMenu')
})

