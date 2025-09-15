// preload.js
// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron');
// !only CommonJS


// 렌더와 통신용
contextBridge.exposeInMainWorld('electronAPI', {
  hello: () => ipcRenderer.invoke('hello'),
  timeNow: () => ipcRenderer.invoke('timeNow'),
  quit: () => ipcRenderer.send('quit'),
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),  
});