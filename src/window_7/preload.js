const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnSendNotifications: () => ipcRenderer.send('fnSendNotifications'),
});

