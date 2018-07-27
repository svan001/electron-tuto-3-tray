const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const MainWindow = require('./app/main_window');

const {
    app,
    ipcMain
} = electron;

// Const reference to avoid garbage collection 
let mainWindow;
let tray;

app.on('ready', () => {
    console.log(`Platform is ${process.platform}`);

    const iconName = process.platform !== 'darwin' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    // (macOs only) Hide the tray app on the dock 
    if (process.platform === 'darwin') {
        app.dock.hide();
    }

    const loadURL = `file://${__dirname}/src/index.html`;
    mainWindow = new MainWindow(loadURL, iconPath);

    tray = new AppTray(iconPath, mainWindow);
});


ipcMain.on('update-time', (event, timeLeft) => {
    // macos only...
    tray.setTitle = timeLeft;
});