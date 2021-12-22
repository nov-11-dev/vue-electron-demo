import { autoUpdater } from 'electron-updater'
import { app, protocol, BrowserWindow, dialog } from 'electron'

autoUpdater.autoInstallOnAppQuit = false
autoUpdater.on('checking-for-update', () => {
  console.log('正在检查更新……')
})
autoUpdater.on('update-available', (ev, info) => {
  console.log('下载更新包成功')
})
autoUpdater.on('update-not-available', (ev, info) => {
  console.log('现在使用的就是最新版本，不用更新')
})
autoUpdater.on('error', (ev, err) => {
  console.log('检查更新出错')
  console.log(ev)
  console.log(err)
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  console.log('正在下载...')
})
autoUpdater.on('update-downloaded', (ev, releaseNotes, releaseName) => {
  console.log('下载完成，更新开始')
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  const options = {
    type: 'info',
    buttons: ['确定', '取消'],
    title: '应用更新',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: '发现有新版本，是否更新？'
  }
  dialog.showMessageBox(options).then((returnVal) => {
    if (returnVal.response === 0) {
      console.log('开始更新')
      setTimeout(() => {
        autoUpdater.quitAndInstall()
      }, 5000)
    } else {
      console.log('取消更新')
      return
    }
  })
})
