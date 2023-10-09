const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('bridgeApi', {
    fnSetThemeMode: mode => ipcRenderer.send('fnSetThemeMode', mode),
    fnSetCustomColor: (bgColor, titleStyle) => ipcRenderer.send('fnSetCustomColor', bgColor, titleStyle),
});

