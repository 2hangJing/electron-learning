const path = require('path');
const {app, BrowserWindow, ipcMain, dialog, Menu, screen} = require('electron');

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

    /***** 事件 *****/
    const fnOpenMessageDialog = async () => {
        const result = await dialog.showMessageBox(win, {
            title: '对话消息框',
            message: '第一次调用系统对话框，是否确定？',
            buttons: ['确定', '取消'],
            defaultId: 0,
            cancelId: 1,
            checkboxLabel: '确认调用？',
            checkboxChecked: true,
        });
        return result;
    };

    const fnOpenDialog = async () => {
        const result = await dialog.showOpenDialog(win, {
            title: '对话框',
            // message 仅 mac 有效
            // message: '第一次调用系统对话框，是否确定？',
            buttonLabel: '确定按钮 label',
            filters: [
                // name: 过滤器名称
                // extensions: 支持的文件扩展
                // {name: 'Images', extensions: ['jpg']}
            ],
            properties: ['openFile', 'multiSelections']
        });
        return result;
    };

    const fnOpenSaveDialog = async () => {
        const result = await dialog.showSaveDialog(win, {
            title: '对话框',
            // message 仅 mac 有效
            // message: '第一次调用系统对话框，是否确定？',
            buttonLabel: '确定按钮 label',
            // 打开弹窗时默位置
            defaultPath: path.resolve(__dirname)
        });
        return result;
    };



    ipcMain.handle('fnOpenMessageDialog', fnOpenMessageDialog);
    ipcMain.handle('fnOpenDialog', fnOpenDialog);
    ipcMain.handle('fnOpenSaveDialog', fnOpenSaveDialog);

    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeHandler('fnOpenMessageDialog');
        ipcMain.removeHandler('fnOpenDialog');
        ipcMain.removeHandler('fnOpenSaveDialog');
    });
};


module.exports = fnCreateWindow;