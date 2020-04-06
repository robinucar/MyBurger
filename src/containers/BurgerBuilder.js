import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 1,
  cheese: 0.5,
  meat: 1.5
}
 class BurgerBuilder extends Component {
   state = {
     ingredients:{
       salad: 0,
       bacon: 0,
       cheese: 0,
       meat: 0
     },
     totalPrice: 4,
     purchasable: false,
   }

   updatePurchaseState (ingredients)  {

     const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey]
        })
        .reduce((sum, el) => {
          return sum + el
        },0);
        this.setState({purchasable: sum > 0 });
   }

    addIngrediantsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
          ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngrediantsHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if(oldCount <= 0){
        return;
      }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
          ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }
    return (
      <Aux>
      <Burger ingredients = {this.state.ingredients}/>
        <BuildControls ingredientsAdded = { this.addIngrediantsHandler }
                       ingrediantsRemoved = { this.removeIngrediantsHandler }
                       disabled = { disabledInfo }
                       purchasable = { this.state.purchasable }
                       price = { this.state.totalPrice }
                       />
      </Aux>
    )
  }
}
export default BurgerBuilder;