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
  const [isMobile, setIsMobile] = useState<boolean>(getSize().innerWidth <= mobileWidth)

  useEffect(setEventListener('resize', () => {
    const wasMobile = isMobile
    const isNowMobile = getSize().innerWidth <= mobileWidth
    if (wasMobile !== isNowMobile) {
      setIsMobile(isNowMobile)
    }
  }))

  return {
    isMobile,
    isDesktop: !isMobile
  }
}
