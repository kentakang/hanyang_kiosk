/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const electron = require('electron');
const { app, BrowserWindow, globalShortcut, dialog, ipcMain } = require('electron');
const path = require('path');
const request = require('request');
const iconv = require('iconv-lite');
const charset = require('charset');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

let win;

const createWindow = () => {
  win = new BrowserWindow({ width: 1280, height: 1024, kiosk: false, 'fullscreen': false, 'frame': true, webPreferences: { nodeIntegration: true } });

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '/../build/index.html')}`);

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  const quit = globalShortcut.register('ctrl + q', () => {
    win.close();
    app.quit();
  });

  const devTools = globalShortcut.register('ctrl + d', () => {
    win.webContents.send('openConfig');
  });

  if (!quit || !devTools) {
    dialog.showErrorBox('hanyang_kiosk', '단축키 등록에 실패했습니다, 관리자에게 문의 바랍니다.');
  }

  const { powerMonitor } = require('electron');

  setInterval(() => {
    powerMonitor.querySystemIdleTime(time => {
      if (time > 60) {
        win.webContents.send('goSplash');
      }
    });
  }, 10000);
};

const checkScreenRotate = () => {
  const display = electron.screen.getPrimaryDisplay();
  
  if (display.rotation !== 90 && display.rotation !== 270) {
    dialog.showErrorBox('hanyang_kiosk', '세로 화면에서 실행하지 않을 경우, 일부 구성 요소에 문제가 있을 수 있습니다.');
  }
};

app.on('ready', () => {
  createWindow();
  checkScreenRotate();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})

ipcMain.on('requestNewsList', event => {
  request.get({url: 'http://hanyangnews.com/news/new_list.asp?page=1&newsdate=', encoding: null}, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const encoding = charset(res.headers, body);
      const iconvResult = iconv.decode(body, encoding);

      event.sender.send('responseNewsList', iconvResult);
    }
  });
});

ipcMain.on('requestNews', (event, idx) => {
  request.get({url: `http://hanyangnews.com/news/view.asp?idx=${idx}`, encoding: null}, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const encoding = charset(res.headers, body);
      const iconvResult = iconv.decode(body, encoding);

      event.sender.send('responseNews', iconvResult);
    }
  });
});

ipcMain.on('addImage', (event, arg) => {
  event.sender.send('addImageComplete', fs.readFileSync(arg).toString('base64'));
});