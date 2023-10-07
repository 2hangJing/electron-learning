const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnSetTitle: title => ipcRenderer.send('fnSetTitle', title)
});