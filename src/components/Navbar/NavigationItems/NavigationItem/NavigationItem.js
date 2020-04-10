import React from 'react';
import styles from '../NavigationItem/NavigationItem.module.css';

const NavigationItem = (props) => (
 <li className = {styles.NavigationItem}>
    <a
      href= { props.link }
      className= {props.active ? styles.active : null}> { props.children }
    </a>
    <div><h1>HERE I AM</h1></div>

 </li>
)

export default NavigationItem
