import { useEffect, useState } from "react"

const useDetectActiveTab = () => {
  const [tabActive, setTabActive] = useState(true)
  
  useEffect(() => {
    const detectTabActive = () => {
      setTabActive(document.visibilityState === 'visible')
    }
    
    document.addEventListener('visibilitychange', detectTabActive)

    return () => {
      document.removeEventListener('visibilitychange', detectTabActive)
    }
  }, [])
  
  return { tabActive }
}

export default useDetectActiveTab