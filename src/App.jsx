import React, { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import StatusBar from './components/StatusBar.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import GovServicesScreen from './screens/GovServicesScreen.jsx'
import IdentityDocScreen from './screens/IdentityDocScreen.jsx'
import BottomNav from './components/BottomNav.jsx'
import './App.css'

// Три экрана, между которыми переключается приложение
const SCREENS = {
  HOME: 'home',
  GOV_SERVICES: 'gov_services',
  IDENTITY_DOC: 'identity_doc',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME)

  const goHome = () => setScreen(SCREENS.HOME)
  const goGovServices = () => setScreen(SCREENS.GOV_SERVICES)
  const goIdentityDoc = () => setScreen(SCREENS.IDENTITY_DOC)

  return (
    <PhoneFrame>
      <StatusBar />
      <div className="screen-container">
        {screen === SCREENS.HOME && (
          <HomeScreen onOpenGovServices={goGovServices} />
        )}
        {screen === SCREENS.GOV_SERVICES && (
          <GovServicesScreen onBack={goHome} onOpenIdentityDoc={goIdentityDoc} />
        )}
        {screen === SCREENS.IDENTITY_DOC && (
          <IdentityDocScreen onBack={goGovServices} />
        )}
      </div>
      {screen === SCREENS.HOME && <BottomNav />}
    </PhoneFrame>
  )
}
