import { useState, useEffect } from 'react'

const MOBILE = 540

type WindowSize = {
  innerHeight: number
  innerWidth: number
}

const getSize = (): WindowSize => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
})

type AnyFn = (a: any) => any
const setEventListener = (event: string, handler: AnyFn) => () => {
  window.addEventListener(event, handler)
  return () => window.removeEventListener(event, handler)
}


export default function useResponsive(mobileWidth: number) {
  const [windowSize, setWindowSize] = useState<WindowSize>(getSize())
  const handleResize = () => setWindowSize(getSize())

  useEffect(setEventListener('resize', handleResize))

  return {
    isMobile: windowSize.innerWidth <= mobileWidth,
    isDesktop: windowSize.innerWidth > mobileWidth
  }
}
