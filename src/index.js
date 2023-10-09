const path = require('path');
const {app, BrowserWindow, ipcMain, dialog, Menu, screen} = require('electron');
const fnCreateWindow_6 = require('./window_6/createWindow');
const fnCreateWindow_7 = require('./window_7/createWindow');
const fnCreateWindow_8 = require('./window_8/createWindow');
const fnCreateWindow_camera = require('./window_camera/createWindow');

const createWindow_default = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        x: 100,
        y: 100,
        // alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, './window_default/preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './window_default/index.html'));
    // 打开开发工具
    // win.webContents.openDevTools();
};

const createWindow_1 = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        x: 100,
        y: 100,
        // alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, './window_1/preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './window_1/index.html'));
    // 打开开发工具
    win.webContents.openDevTools();
    /***** 事件 *****/
    const fnChangeTItle = (event, arg) => {
        // 获取发送 window 针对性的修改 window title
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(arg);
    };
    ipcMain.on('fnSetTitle', fnChangeTItle);

    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeListener('fnSetTitle', fnChangeTItle);
    });
};

const createWindow_2 = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        x: 100,
        y: 100,
        // alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, './window_2/preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './window_2/index.html'));
    // 打开开发工具
    win.webContents.openDevTools();
    const menu = Menu.buildFromTemplate([{
        label: '修改渲染进程 count',
        submenu: [
            {
                click: () => win.webContents.send('fnChangeCount', 1),
                label: '增加 1'
            },
            {
                click: () => win.webContents.send('fnChangeCount', -1),
                label: '减少 1'
            }
        ]
    }]);
    win.setMenu(menu);
};

const createWindow_3 = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        x: 100,
        y: 300,
        // alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, './window_3/preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './window_3/index.html'));
    // 打开开发工具
    win.webContents.openDevTools();
    /***** 事件 *****/
    const fnGetImagePath = async (event, arg) => {
        const {canceled, filePaths} = await dialog.showOpenDialog();
        if (!canceled) {
            return filePaths[0];
        }
    };
    ipcMain.handle('fnGetImagePath', fnGetImagePath);

    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeHandler('fnGetImagePath');
    });
};

const createWindow_4 = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 200,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, './window_4/preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './window_4/index.html'));
   
    /***** 事件 *****/
    const fnToInit = num => Math.ceil(num);
    const fnSetScreenWH = (event, w, h) => {
        const {width, height} = screen.getPrimaryDisplay().size;
        const x = fnToInit(width/2 - Number(w)/2);
        const y = fnToInit(height/2 - Number(h)/2);
        win.setBounds({width: fnToInit(w), height: fnToInit(h), x, y}, true);
    }
    
    ipcMain.on('fnSetScreenWH', fnSetScreenWH);
    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeListener('fnSetScreenWH', fnSetScreenWH);
    });
};

const createWindow_5 = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 300,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, './window_5/preload.js')
        }
    });
    win.loadFile(path.resolve(__dirname, './window_5/index.html'));
    
    const topMenuTemplate = [
        {
            type: 'submenu',
            // role: 'selectAll',
            label: '系统菜单',
            submenu: [
                {type: 'normal', role: 'selectAll', label: '选中所有', accelerator: 'CommandOrControl+h'},
                {type: 'separator'},
                {type: 'checkbox', label: '多选框_1', role: 'multi'},
                {type: 'checkbox', label: '多选框_2', role: 'multi'},
                {type: 'checkbox', label: '多选框_3', role: 'multi'},
                {type: 'radio', label: '单选框_1', role: 'single'},
                {type: 'radio', label: '单选框_2', role: 'single'},
                {type: 'radio', label: '单选框_3', role: 'single'},
            ]
        }
    ];

    const rightMenuTemplate = [
        {
            type: 'submenu',
            // role: 'selectAll',
            label: '系统菜单',
            submenu: [
                {type: 'normal', role: 'selectAll', label: '选中所有', accelerator: 'CommandOrControl+h'},
                {type: 'separator'},
                {type: 'checkbox', label: '多选框_1', role: 'multi'},
                {type: 'checkbox', label: '多选框_2', role: 'multi'},
                {type: 'checkbox', label: '多选框_3', role: 'multi'},
                {type: 'radio', label: '单选框_1', role: 'single'},
                {type: 'radio', label: '单选框_2', role: 'single'},
                {type: 'radio', label: '单选框_3', role: 'single'},
            ]
        }
    ];

    // !注意：设置窗口菜单栏后会导致 develop tool 快捷键失效！
    // 取消当前窗口顶部菜单栏
    // win.setMenu(null);
    // 当前窗口菜单栏设置
    // win.setMenu(Menu.buildFromTemplate(topMenuTemplate));

    // -设置全部窗口菜单栏
    Menu.setApplicationMenu(Menu.buildFromTemplate(topMenuTemplate));

    const fnOpenRightMenu = () => {
        // 生成菜单
        const rightMenu = Menu.buildFromTemplate(rightMenuTemplate);
        // 通过弹出方式展示菜单
        rightMenu.popup({
            window: win,
        });
    };
    
    /***** 事件 *****/
    ipcMain.on('fnOpenRightMenu', fnOpenRightMenu);
    /***** 生命周期 *****/
    win.on('closed', () => {
        ipcMain.removeListener('fnOpenRightMenu', fnOpenRightMenu);
    });
};


ipcMain.on('fnCreateWindow_1', (event, arg) => {
    createWindow_1();
});
ipcMain.on('fnCreateWindow_2', (event, arg) => {
    createWindow_2();
});
ipcMain.on('fnCreateWindow_3', (event, arg) => {
    createWindow_3();
});
ipcMain.on('fnCreateWindow_4', (event, arg) => {
    createWindow_4();
});
ipcMain.on('fnCreateWindow_5', (event, arg) => {
    createWindow_5();
});
ipcMain.on('fnCreateWindow_6', (event, arg) => {
    fnCreateWindow_6();
});
ipcMain.on('fnCreateWindow_7', (event, arg) => {
    fnCreateWindow_7();
});
ipcMain.on('fnCreateWindow_8', (event, arg) => {
    fnCreateWindow_8();
});
ipcMain.on('fnCreateWindow_camera', (event, arg) => {
    fnCreateWindow_camera();
});


app.whenReady().then(() => {
    createWindow_default();
});