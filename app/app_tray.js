const electron = require('electron');
const {
    Tray,
    Menu,
    app
} = electron;

class AppTray extends Tray {

    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.mainWindow = mainWindow;

        this.setToolTip('Timer App');

        // Overload handlers

        // Mac + windows only, no linux :(
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));

        if (process.platform === 'linux') {
            const menuConfig = Menu.buildFromTemplate([{
                label: 'Show',
                click: (event) => {
                    this.onClick(event);
                }
            }, {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }]);

            this.setContextMenu(menuConfig);
        }
    }

    onClick(event, bounds) {
        var mainScreen = electron.screen.getPrimaryDisplay();
        var displayDimension = mainScreen.size;
        console.log(displayDimension.width + "x" + displayDimension.height);

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const {
                height,
                width
            } = this.mainWindow.getBounds();

            // bounds/ point broken on linux/EOS :(
            // const {x, y} = bounds;
            let xPos = displayDimension.width - width - 20;
            let yPos = 50;

            // PAS TESTER
            if (process.platform === 'win32') {
                xPos = bounds.x - width / 2;
                yPos = bounds.y - height;
            } else if (process.platform === 'darwin') {
                xPos = bounds.x - width / 2;
                yPos = bounds.y;
            }

            this.mainWindow.setBounds({
                x: xPos,
                y: yPos,
                height: height,
                width: width
            });
            this.mainWindow.show();
        }
    }

    onRightClick(event) {
        const menuConfig = Menu.buildFromTemplate([{
            label: 'Quit',
            click: () => {
                app.quit();
            }
        }]);

        this.popUpContextMenu(menuConfig);
    }
}


module.exports = AppTray;