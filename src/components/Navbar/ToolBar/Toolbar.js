import React from 'react';
import styles from '../ToolBar/Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';

const Toolbar = () => (
    <header className = {styles.Toolbar}>
      <div>Menu</div>
      <Logo />
      <nav>
        ...
      </nav>
    </header>
  )


export default Toolbar
