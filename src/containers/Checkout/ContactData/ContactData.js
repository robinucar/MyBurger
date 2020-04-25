import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      flat: '',
      number: '',
      postCode: '',
      city: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
     this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mehmet Ucar',
                email: 'ucarmehmet.ch@gmail.com',
                address: {
                    street: 'Woodberry Down',
                    flat: 'Knaresbrough House',
                    number: '27',
                    postCode: 'N4 2TS',
                    city: 'LONDON'
                },
                deliveryMethod: 'fastest'
            },

        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
  }

  render() {
    let form = (
      <form>

        <Input inputtype='input' type="text" name='fullName' placeholder='Full Name'/>
        <Input inputtype='input' type="email" name='email' placeholder='E-mail'/>
        <Input inputtype='input' type="text" name='street' placeholder='Street'/>
        <Input inputtype='input' type="text" name='flat' placeholder='flat'/>
        <Input inputtype='input' type="number" name='number' placeholder='Flat Number'/>
        <Input inputtype='input' type="text" name='postCode' placeholder='Post Code'/>
        <Input inputtype='input' type="text" name='city' placeholder='City'/>
        <Input inputtype='input' type="tel" name='tel' placeholder='Phone Number'/>
        <Button btnType='Success' clicked={this.orderHandler}>Order</Button>

    </form>
    );
    if (this.state.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please add your contact details...</h4>
        {form}
      </div>
    )
  }
}
export default ContactData;