import { useEffect, useRef } from 'react'


import "react-confirm-alert/src/react-confirm-alert.css";

import { APP_INSTALLED, BEFORE_INSTALL_PROMPT, INSTALLATION_MESSAGE, INSTALLATION_STATUS, getDeviceInfo } from './helper/helper';
import { UAParser } from "ua-parser-js";
import { installationPrompt } from './components/molecules/PWAInstallationPrompts/InstallationPrompt';
import { manualPrompt } from './components/molecules/PWAInstallationPrompts/ManualPrompt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMountainSun, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';

function App() {
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
      <header></header>

      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
      <footer className='absolute inset-x-0 bottom-0 w-full flex border-t-4 border-cyan-500 bg-white' style={{ position: 'fixed', bottom: 0 }}>
        <nav className="w-full flex pt-2">
          <div className="flex-1 justify-center flex">
            <Link to="/" className="flex flex-col items-center cursor-pointer" >
              <FontAwesomeIcon icon={faHouse} size="lg" color='rgb(6, 182, 212)' />
              <p className="block text-cyan-500  font-bold">Home</p>
            </Link>
          </div>
          <div className="flex-1 justify-center flex">
            <Link to="/dreams" className="flex flex-col items-center cursor-pointer">
              <FontAwesomeIcon icon={faMountainSun} size="lg" color='rgb(6, 182, 212)' />
              <p className="block text-cyan-500  font-bold">Dreams</p>
            </Link>
          </div>
          <div className="flex-1 justify-center flex">
            <Link to="/help" className="flex flex-col items-center cursor-pointer">
              <FontAwesomeIcon icon={faPhone} size="lg" color='rgb(6, 182, 212)' />
              <p className="block text-cyan-500  font-bold">Help</p>
            </Link>
          </div>
        </nav>
      </footer>

    </>
  )
}

export default App
