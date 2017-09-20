import { app, BrowserWindow, ipcMain, Menu } from 'electron';

/**
 * This function hold all Electron IPC listeners.
 *
 * @param {Electron.BrowserWindow} window The window object, in case the event
 *    manipulates it.
 */
function initMainListener(window: Electron.BrowserWindow) {
  ipcMain.on('ELECTRON_BRIDGE_HOST', (event: Electron.Event, msg: any) => {
    console.log(`[ELECTRON_BRIDGE_HOST] ${msg}`);
    if (msg === 'rareink:generic:ping') {
      event.sender.send('ELECTRON_BRIDGE_CLIENT', 'rareink:generic:pong');
    }
    if (msg === 'rareink:window:requestmaximizedstate') {
      setWindowMaximizedState(window);
    }
    if (msg === 'rareink:window:minimize') {
      window.minimize();
    }
    if (msg === 'rareink:window:maximize') {
      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
      setWindowMaximizedState(window);
    }
    if (msg === 'rareink:window:close') {
      window.close();
    }
  });
}

function setWindowMaximizedState(window: Electron.BrowserWindow) {
  if (window.isMaximized()) {
    window.webContents.send('ELECTRON_BRIDGE_CLIENT', 'rareink:window:ismaximized');
  } else {
    window.webContents.send('ELECTRON_BRIDGE_CLIENT', 'rareink:window:isunmaximized');
  }
}

export default initMainListener;
