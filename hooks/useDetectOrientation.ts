import { useEffect, useState } from "react"

const useDeviceSpecs = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [isMobile, setIsMobile] = useState(false)

  const checkIsMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerHeight > window.innerWidth) {
        return 'portrait'
      }
      return 'landscape'
    }

    setIsMobile(checkIsMobile())
    setOrientation(handleOrientationChange())

    const onOrientationChange = () => {
      setOrientation(handleOrientationChange())
      setIsMobile(checkIsMobile())
    }

    window.addEventListener('resize', onOrientationChange)

    return () => {
      window.removeEventListener('resize', onOrientationChange)
    }
  }, [])

  return { orientation, isMobile }
}

export default useDeviceSpecs