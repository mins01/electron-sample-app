import { app, BrowserWindow ,ipcMain , session} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // kiosk: true,          // 키오스크 모드 활성화
    frame: true,         // 상단 메뉴 바 제거
    // fullscreen: true,     // 전체 화면
    webPreferences: {
      contextIsolation: true,    // 필수
      nodeIntegration: false,    // 필수
      enableRemoteModule: false, // 권장
      preload: path.join(__dirname, 'src/preload.js'), // 필요시
    }
  });
  // console.log(path.join(__dirname, 'src/preload.js'));

  mainWindow.loadFile('index.html');
  // mainWindow.loadURL('http://mins01.com');

  mainWindow.webContents.openDevTools({ mode: 'detach' }); // 디버거



  // 키오스크 모드에서는 일반적으로 닫기/이동 불가
  mainWindow.on('closed', () => {
    // mainWindow = null;
  });
}

app.whenReady().then(() => {
  // 권한 요청 핸들러
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') {
      // media: video + audio
      callback(true); // 허용
    } else {
      callback(false); // 그 외는 거부
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});





// IPC 핸들러
ipcMain.handle('timeNow', () => {
  return (new Date()).toLocaleString();
});
ipcMain.on('quit', (event) => {
  console.log('Renderer requested app quit');
  app.quit();  // 앱 종료
});
ipcMain.on('toggle-fullscreen', () => {
  console.log('xxx')
  if (mainWindow) {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  }
});

ipcMain.on('index_html', () => {
  if (mainWindow) {
    mainWindow.loadFile('index.html');
  }
});

ipcMain.on('network-video_html', () => {
  console.log('xxx')
  if (mainWindow) {
    mainWindow.loadFile('network-video.html');
  }
});