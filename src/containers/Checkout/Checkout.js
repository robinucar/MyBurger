import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
  state = {
    ingredients:null,
    price:0
  }

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
  render() {
    return (
      <div>
        <CheckoutSummary ingredients = {this.state.ingredients} />
      </div>
    )
  }
}


export default Checkout;