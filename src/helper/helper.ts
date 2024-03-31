import UAParser from "ua-parser-js"
export const getDeviceInfo = (UserAgent: UAParser.UAParserInstance) => {
    const Device = UserAgent.getDevice()
    const OS = UserAgent.getOS()
    return {
        device: {
            isMobile: Device.type == "mobile",
            isTablet: Device.type == "tablet",
            isAndroid: OS.name == "Android",
            isIOS: OS.name == "iOS",
        },
        pwa: {
            isStandalone: (window: Window & typeof globalThis) => window.matchMedia('(display-mode: standalone)').matches,
        },
        userAgent: UserAgent.getUA(),
        browser: UserAgent.getBrowser()
    }
}


export const BEFORE_INSTALL_PROMPT = "beforeinstallprompt"

export const APP_INSTALLED = "appinstalled"

export const INSTALLATION_STATUS = "TECHNOLOGISTS_DREAM_STATUS"
export const INSTALLATION_MESSAGE = "TECHNOLOGISTS_DREAM_INSTALLED"

