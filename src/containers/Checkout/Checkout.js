import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients:null,
    price:0
  }

<<<<<<< HEAD
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for(let param of query.entries()){
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

    }
    this.setState({ingredients: ingredients, totalPrice: price})
  }

=======
>>>>>>> parent of 59ff674... navigated ContactData component
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients = {this.state.ingredients}
                         checkoutCancelled = {this.checkoutCancelledHandler}
                         checkoutContinued = {this.checkoutContinuedHandler}
        />
<<<<<<< HEAD
        <Route path = {this.props.match.path + '/contact-data'}
               render = {() => (<ContactData ingredients = {this.state.ingredients}
                                              />)} />
=======
>>>>>>> parent of 59ff674... navigated ContactData component
      </div>
    )
  }
}


export default Checkout;