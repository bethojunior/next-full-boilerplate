'use client'

import { useState } from 'react'
import InspectionResult from './inspection-result'
import InspectionSelection from './inspection-selection'
import LoginPage from './login-page'
import QRScanner from './qr-scanner'

type AppStep = 'login' | 'selection' | 'scanner' | 'result'

export default function AppFlow() {
  const [currentStep, setCurrentStep] = useState<AppStep>('login')
  const [inspectionType, setInspectionType] = useState<'native' | 'etufor' | 'prefeitura' | null>(
    null
  )
  const [scannedData, setScannedData] = useState<string | null>(null)

  const handleLogin = () => {
    setCurrentStep('selection')
  }

  const handleInspectionSelect = (type: 'native' | 'etufor' | 'prefeitura') => {
    setInspectionType(type)
    setCurrentStep('scanner')
  }

  const handleQRScan = (data: string) => {
    setScannedData(data)
    setCurrentStep('result')
  }

  const handleNewInspection = () => {
    setCurrentStep('selection')
    setInspectionType(null)
    setScannedData(null)
  }

  const handleBackToSelection = () => {
    setCurrentStep('selection')
  }

  const handleBackToScanner = () => {
    setCurrentStep('scanner')
  }

  switch (currentStep) {
    case 'login':
      return <LoginPage onLogin={handleLogin} />

    case 'selection':
      return <InspectionSelection onSelect={handleInspectionSelect} />

    case 'scanner':
      return <QRScanner onScan={handleQRScan} onBack={handleBackToSelection} />

    case 'result':
      return <InspectionResult onNewInspection={handleNewInspection} onBack={handleBackToScanner} />

    default:
      return <LoginPage onLogin={handleLogin} />
  }
}
