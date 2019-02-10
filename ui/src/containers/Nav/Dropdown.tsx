import React, { Component } from 'react'

import styles from './styles.module.scss'
import styleVars from '../../styles'

type DropdownProps = {
  hide: Function,
  children: any
}

export default class Dropdown extends React.Component<DropdownProps> {
  id = '__dropdown_component__'

  hideDropdown = (e: any) => {
    const dropdown = document.getElementById(this.id)
    console.log(dropdown, e.target !== dropdown, dropdown && !dropdown.contains(e.target))
    if (dropdown && e.target !== dropdown && !dropdown.contains(e.target)) {
      this.props.hide()
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDropdown)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown)
  }

  render() {
    const { children } = this.props
    return (
      <div
        id={this.id}
        className={styles.dropdown}
        style={styleVars.bg}
      >
        {children}
      </div>
    )
  }
}
