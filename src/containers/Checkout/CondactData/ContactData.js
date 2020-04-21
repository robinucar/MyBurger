import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      flatName: '',
      flatNumber: '',
      postCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})

      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price + ' £',
        customer: {
          name: 'Mehmet Ucar',git log
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
        this.setState({loading:false})
      })
      .catch(error => {
        this.setState({loading:false})
      })

  }

  render() {
    return (
      <div>
        <h4>Enter your Contact details below please</h4>
        <form>

        <input  type="text" name="name" placeholder="Your Name: "/>
        <input  type="email" name="email" placeholder="E Mail: "/>
        <input  type="text" name="streetName" placeholder="Street Name: "/>
        <input  type="text" name="flatName" placeholder="Flat Name: "/>
        <input  type="number" name="flatNumber" placeholder="Flat Number:  "/>
        <input  type="text" name="postCode" placeholder="Post Code: "/>
        <Button
        btnType = 'Success'
        clicked = {this.orderHandler}>ORDER</Button>

        </form>
      </div>
    )
  }
}

export default ContactData;