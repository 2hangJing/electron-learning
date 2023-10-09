const path = require('path');
const {app, BrowserWindow, ipcMain, Notification} = require('electron');

const fnCreateWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 400,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './index.html'));

    const fnSendNotifications = () => {
        if(!Notification.isSupported()) {
            console.log(`[${new Date().toLocaleString()}] - 当前系统不支持通知！` );
            return;
        }

        const notification = new Notification({
            title: '通知系统 title',
            body: '通知系统 通知正文',
            // 是否静音
            silent: false,
            icon: path.resolve(__dirname, './icon.jpg')
        });

        notification.show();

        notification.on('click', () => console.log(`[${new Date().toLocaleString()}] - user click!`));
        notification.on('close', () => console.log(`[${new Date().toLocaleString()}] - user close!`));
        
    };

    ipcMain.on('fnSendNotifications', fnSendNotifications);

    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeListener('fnSendNotifications', fnSendNotifications);
    });
};


module.exports = fnCreateWindow;