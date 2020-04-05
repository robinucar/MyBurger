import React from 'react'
import Aux from '../../hoc/Aux'
import styles from '../Layout/Layout.module.css';
const Layout = (props) => {
  return (
    <Aux>
      <div>Toolbar, Sidedrawer, Backdrop </div>
      <main className = {styles.Content}>
      {props.children}
      </main>
    </Aux>
  )
}

export default Layout

