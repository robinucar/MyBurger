import React from 'react';
import styles from '../ToolBar/Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const Toolbar = () => (
    <header className = {styles.Toolbar}>
      <div>Menu</div>
      <div className = {styles.Logo}>
        <Logo />
      </div>
      <nav className = {styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  )


export default Toolbar
