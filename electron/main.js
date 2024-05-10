const { app, BrowserWindow, Menu, crashReporter } = require('electron');
const path = require('path');

app.setName('Ragtastic (UI Preview)');

function createWindow() {
    const win = new BrowserWindow({
        title: 'Ragtastic: Owl Chat (UI Preview Only)',
        width: 1200,
        height: 900,
        frame: true,
        icon: 'icon.png',
        webPreferences: {
            webSecurity: false, // Only for testing, disables CORS
            nodeIntegration: true,
            contextIsolation: false, // Only if necessary for your use case
        }
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')  // Optional: path to your preload script
        // }
    });
    // win.openDevTools();
    const menuTemplate = [
        {
            label: app.name,
            submenu: [
                { role: 'about', label: 'About Ragtastic Owl Chat' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        // Add other menu options as needed
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    // Open the DevTools.
    // win.webContents.openDevTools();
    
    // Path to the built index.html of React app
    // const startUrl = '/Users/david.yerrington/Projects/personal/ragtastic/client/dist/index.html';
    // const startPath = '/Users/david.yerrington/Projects/personal/ragtastic/client/dist/index.html';
    const startPath = 'app-dist/index.html';
    console.log('Loading:', startPath);
    win.loadFile(startPath).catch(err => {
      console.error('Failed to load:', err);
    });
    // I was having a build problem so I used this instead for testing
    // const startUrl = "http://www.google.com"
    // win.loadURL(startUrl);

    console.log(app.getPath('crashDumps'))
    crashReporter.start({ submitURL: '', uploadToServer: false })


}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

