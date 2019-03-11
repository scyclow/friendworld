import React, { Component, useEffect } from 'react'
import cx from 'classnames'
import styles from './styles.module.scss'


type Props = {
  hide: Function,
  children: any
}

const ELEMENT_ID = '__dropdown_component__'

export default function Dropdown({ children, hide }: Props) {
  const hideDropdown = (e: any) => {
    const dropdown = document.getElementById(ELEMENT_ID)
    if (dropdown && e.target !== dropdown && !dropdown.contains(e.target)) {
      hide()
    }
  }

  useEffect(() => {
    document.addEventListener('click', hideDropdown)
    return () => document.removeEventListener('click', hideDropdown)
  })

  return (
    <div id={ELEMENT_ID} className={cx(styles.dropdown, 'solid')}>
      {children}
    </div>
  )
}
