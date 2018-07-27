const electron = require('electron');
const {
    BrowserWindow
} = electron;

class MainWindow extends BrowserWindow {

    constructor(loadURL, iconPath) {
        super({
            height: 500,
            width: 300,
            // No window decoration
            frame: false,
            // Block window rezise
            resizable: false,
            show: false,
            // Needed on linux to show icon on taskbar (if wants to show in the task bar)
            icon: iconPath,
            // Won't show the tray icon app on taskBar, app.dock.hide() for mac
            skipTaskbar: true,
            webPreferences : {
                // Avoid freeze of the app when no focused (tray)
                backgroundThrottling : false
            }
        });

        this.loadURL(loadURL);
    
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.hide();
    }
}

module.exports = MainWindow;