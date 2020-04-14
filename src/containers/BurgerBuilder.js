import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spiner from '../components/UI/Spiner/Spiner';

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
     purchasing: false,
     loading: false
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

    purchasingHandler = () => {
      this.setState({purchasing: true});
    }

    purchasingCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purhasingContinueHandler = () => {
      this.setState({loading: true})

      const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice + ' £',
        customer: {
          name: 'Mehmet Ucar',
          adress: {
            street: 'Woodberry Down Estate',
            house: 'Knaresborough House',
            number: '27',
            postcode: 'N4 2TS',
            city: 'London',
            country: 'The United Kongdom'
          },
          email: 'mehmet.ucar@imediapro.co.uk'

        },
        deliveryMethod: 'fastest'
      }
      axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading:false, purchasing: false})
      })
      .catch(error => {
        this.setState({loading:false, purchasing: false})
      })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }

    let orderSummary = <OrderSummary ingredients = { this.state.ingredients }
    purchaseCancelled = {this.purchasingCancelHandler}
    purchaseContinued = {this.purhasingContinueHandler}
    price = {this.state.totalPrice}/>

    if(this.state.loading) {
      orderSummary = <Spiner />;
    }

    return (
      <Aux>
        <Modal show = {this.state.purchasing} modalClosed = {this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients = {this.state.ingredients}/>
          <BuildControls ingredientsAdded = { this.addIngrediantsHandler }
                        ingrediantsRemoved = { this.removeIngrediantsHandler }
                        disabled = { disabledInfo }
                        purchasable = { this.state.purchasable }
                        ordered = {this.purchasingHandler}
                        price = { this.state.totalPrice }
          />
      </Aux>
    )
  }
}
export default BurgerBuilder;