const path = require('path');
const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron');
const fnCreateWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        center: true,
        titleBarOverlay: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './index.html'));

    const fnSetThemeMode = (event, mode) => {
        nativeTheme.themeSource = mode;
    };

    const fnSetCustomColor = (event, bgColor, titleStyle) => {
        win.setBackgroundColor(bgColor);
        win.setTitleBarOverlay({
            color: titleStyle
        })
    };

    ipcMain.on('fnSetThemeMode', fnSetThemeMode);
    ipcMain.on('fnSetCustomColor', fnSetCustomColor);

    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeListener('fnSetThemeMode', fnSetThemeMode);
        ipcMain.removeListener('fnSetCustomColor', fnSetCustomColor);
    });
};


module.exports = fnCreateWindow;