const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnCreateWindow_1: () => ipcRenderer.send('fnCreateWindow_1'),
    fnCreateWindow_2: () => ipcRenderer.send('fnCreateWindow_2'),
    fnCreateWindow_3: () => ipcRenderer.send('fnCreateWindow_3'),
    fnCreateWindow_4: () => ipcRenderer.send('fnCreateWindow_4'),
    fnCreateWindow_5: () => ipcRenderer.send('fnCreateWindow_5'),
    fnCreateWindow_6: () => ipcRenderer.send('fnCreateWindow_6'),
});