import React from 'react'
import Aux from '../../hoc/Aux'
import styles from '../Layout/Layout.module.css';
import Toolbar from '../../components/Navbar/ToolBar/Toolbar';
const Layout = (props) => {
  return (
    <Aux>
      <Toolbar/>
      <main className = {styles.Content}>
      {props.children}
      </main>
    </Aux>
  )
}

export default Layout

