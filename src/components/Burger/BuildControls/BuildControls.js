import React from 'react';
import styles from '../BuildControls/BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';
const controls = [
{label: 'Salad', type: 'salad'},
{label: 'Bacon', type: 'bacon'},
{label: 'Cheese', type: 'cheese'},
{label: 'Meat', type: 'meat'},
];
const BuildControls = (props) => {
  return (
    <div className = {styles.BuildControls}>
      <p>Current Price : <strong>{ props.price.toFixed(2) }</strong> £</p>
        {controls.map(control => (
          <BuildControl key = { control.label }
                        label = { control.label }
                        added = {() => props.ingredientsAdded(control.type)}
                        removed = { () => props.ingrediantsRemoved(control.type)}
                        disabled = {props.disabled[control.type]}
          />
        ))}
        <button
          className = {styles.OrderButton}
          disabled = {!props.purchasable}
          onClick = {props.ordered}>Order Now</button>
    </div>
  )
}

export default BuildControls
