import React from 'react';
import burgerLogo from '../../Assets/images/burger.png';
import styles from '../../components/Logo/Logo.module.css';

const Logo = ( props ) => (

    <div className = { styles.Logo}>
      <img src= {burgerLogo} alt="burger logo"/>
    </div>
)


export default Logo
