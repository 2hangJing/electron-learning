const path = require('path');
const {app, BrowserWindow, ipcMain, Menu, Tray} = require('electron');
const fnCreateWindow = () => {
    const HEIGHT = 310;
    const WIDTH = 310;
    const win = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT,
        center: true,
        transparent: true,
        frame: false,
        icon: path.resolve(__dirname, './icon.png'),
        // titleBarStyle: 'hidden',
        // titleBarOverlay: {
        //     color: '#2f3241',
        //     symbolColor: '#74b1be',
        //     height: 60
        // },
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './index.html'));

    /***** 系统托盘 *****/
    const tray = new Tray(path.resolve(__dirname, './icon.png'));
    tray.setToolTip('摄像头软件');

    // PS: CSS 控制拖拽时会导致拖拽区域右键自定义菜单失效，之能使用系统菜单。
    const menuTemplate = [{
        type: 'normal',
        label: '退出',
        click: () => {
            win.close();
            tray.destroy();
        }
    }];
    const menu = Menu.buildFromTemplate(menuTemplate);
    win.webContents.on('context-menu', e => {
        e.preventDefault();
        menu.popup({
            window: win
        })
    });
    // 托盘绑定相同菜单
    tray.setContextMenu(menu);


    // 使用 JS 处理拖拽
    const fnModifyPosition = (e, offsetX, offsetY) => {
        const [x, y] = win.getPosition();
        win.setBounds({
            width: WIDTH,
            height: HEIGHT,
            x: x + offsetX,
            y: y + offsetY
        });
    };
    ipcMain.on('fnModifyPosition',fnModifyPosition);
    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeListener('fnModifyPosition', fnModifyPosition);
    });
};


module.exports = fnCreateWindow;