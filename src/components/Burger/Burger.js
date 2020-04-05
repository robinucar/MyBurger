import React from 'react'
import styles from '../Burger/Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  return (
    <div className = {styles.Burger}>
        <BurgerIngredient type= 'bread-top'/>
        <BurgerIngredient type= 'cheese'/>
        <BurgerIngredient type= 'meat'/>
        <BurgerIngredient type= 'bread-bottom'/>
    </div>
  )
}

export default burger
