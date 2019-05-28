'use strict'

const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
let mainWindow

const createWindow = () => {
  let displays = electron.screen.getAllDisplays()
  let oneDisplay = displays.find(( display ) => display.bounds.x === 0 && display.bounds.y === 0)

  mainWindow = new BrowserWindow({
    width: 300,
    height: 100,
    transparent: true,
    frame: false,
    x: oneDisplay.workArea.width - 325,
    y: 100,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.setAlwaysOnTop(true)

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if ( process.platform !== 'darwin' ) app.quit()
})

app.on('activate', function () {
  if ( mainWindow === null ) createWindow()
})

ipcMain.on('order', ( event, args ) => {
  if ( mainWindow ) mainWindow.setAlwaysOnTop(true)
})
