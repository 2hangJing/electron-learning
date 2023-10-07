const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnSetScreenWH: (w, h) => {
        ipcRenderer.send('fnSetScreenWH', w, h);
    }
});