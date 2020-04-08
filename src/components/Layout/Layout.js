import React from 'react'
import Aux from '../../hoc/Aux'
import styles from '../Layout/Layout.module.css';
import Toolbar from '../../components/Navbar/ToolBar/Toolbar';
import SideDrawer from '../Navbar/SideDrawer/SideDrawer'
const Layout = (props) => {
  return (
    <Aux>
      <Toolbar/>
      <SideDrawer />
      <main className = {styles.Content}>
      {props.children}
      </main>
    </Aux>
  )
}

export default Layout

