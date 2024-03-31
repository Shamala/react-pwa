import { useEffect, useRef } from 'react'


import "react-confirm-alert/src/react-confirm-alert.css";
import './App.css'
import { APP_INSTALLED, BEFORE_INSTALL_PROMPT, INSTALLATION_MESSAGE, INSTALLATION_STATUS, getDeviceInfo } from './helper/helper';
import { UAParser } from "ua-parser-js";
import { installationPrompt } from './components/molecules/PWAInstallationPrompts/InstallationPrompt';
import { manualPrompt } from './components/molecules/PWAInstallationPrompts/ManualPrompt';
import { Button } from 'flowbite-react';
function App() {
//  const [count, setCount] = useState(0)
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
       <Button>Click me</Button>
      </div>
    </>
  )
}

export default App
