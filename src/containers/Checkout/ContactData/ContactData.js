import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';

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
  }
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Please add your contact details...</h4>
        <form>

          <input className={classes.Input} type="text" name='fullName' placeholder='Full Name'/>
          <input className={classes.Input} type="email" name='email' placeholder='E-mail'/>
          <input className={classes.Input} type="text" name='street' placeholder='Street'/>
          <input className={classes.Input} type="text" name='flat' placeholder='flat'/>
          <input className={classes.Input} type="number" name='number' placeholder='Flat Number'/>
          <input className={classes.Input} type="text" name='postCode' placeholder='Post Code'/>
          <input className={classes.Input} type="text" name='city' placeholder='City'/>
          <input className={classes.Input} type="tel" name='tel' placeholder='Phone Number'/>
          <Button btnType='Success'>Order</Button>

        </form>
      </div>
    )
  }
}
export default ContactData;