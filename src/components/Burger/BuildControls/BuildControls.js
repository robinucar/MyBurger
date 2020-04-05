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
        {controls.map(control => (
          <BuildControl key = { control.label }
                        label = { control.label }
          />
        ))}
    </div>
  )
}

export default BuildControls
