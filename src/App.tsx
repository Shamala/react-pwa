import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import "react-confirm-alert/src/react-confirm-alert.css";
import './App.css'
import { APP_INSTALLED, BEFORE_INSTALL_PROMPT, INSTALLATION_MESSAGE, INSTALLATION_STATUS, getDeviceInfo } from './helper/helper';
import { UAParser } from "ua-parser-js";
import { installationPrompt } from './Elements/InstallationPrompt';
import { manualPrompt } from './Elements/ManualPrompt';
function App() {
  const [count, setCount] = useState(0)
  const { device, pwa } = getDeviceInfo(new UAParser())
 const deferredPrompt = useRef<Event | null>(null)
 const appInstalled = () => {
  localStorage.setItem(INSTALLATION_STATUS, INSTALLATION_MESSAGE)
  deferredPrompt.current = null
 }
 const doNotShowAgain = (close: () => void) => {
  appInstalled()
  close()
 }
 const alreadyInstalled = doNotShowAgain
 const onInstall = (close: () => void) => {
  if (deferredPrompt.current) {
   // @ts-ignore
   deferredPrompt?.current.prompt();
   // Wait for the user to respond to the prompt
   let status = false
   // @ts-ignore
   deferredPrompt.current.userChoice.then((choiceResult) => {
    status = choiceResult.outcome === 'accepted'
   })
   if (status) {
    appInstalled()
    deferredPrompt.current = null;
   }
   close()
  }
 }
 useEffect(() => {
  window.addEventListener(BEFORE_INSTALL_PROMPT, (e) => {
   e.preventDefault()
   deferredPrompt.current = e
  })
  window.addEventListener(APP_INSTALLED, appInstalled)
 }, [])
 useEffect(() => {
  // Trigger PWA installation prompt on mobile devices only
  const isInstallable = device.isMobile || device.isMobile && !pwa.isStandalone(window)
  const isInstalled = localStorage.getItem(INSTALLATION_STATUS)
  setTimeout(() => {
   if (isInstallable && !isInstalled)
    if (deferredPrompt.current) {
     installationPrompt({
      doNotShowAgain,
      onInstall
     })
    } else {
     manualPrompt({
      doNotShowAgain,
      alreadyInstalled,
      isIOS: device.isIOS,
      isAndroid: device.isAndroid
     })
    }
  }, 1e3)
 }, [device.isAndroid, device.isIOS, deferredPrompt.current])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
