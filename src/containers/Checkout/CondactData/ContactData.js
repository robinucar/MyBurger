import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from '../CondactData/ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      flatName: '',
      flatNumber: '',
      postCode: ''
    }
  }
  render() {
    return (
      <div className = {styles.ContactData}>
        <h4>Enter your Contact details below please</h4>
        <form>

        <input className = {styles.Input} type="text" name="name" placeholder="Your Name: "/>
        <input className = {styles.Input} type="email" name="email" placeholder="E Mail: "/>
        <input className = {styles.Input} type="text" name="streetName" placeholder="Street Name: "/>
        <input className = {styles.Input} type="text" name="flatName" placeholder="Flat Name: "/>
        <input className = {styles.Input} type="number" name="flatNumber" placeholder="Flat Number:  "/>
        <input className = {styles.Input} type="text" name="postCode" placeholder="Post Code: "/>
        <Button btnType = 'Success'>ORDER</Button>

        </form>
      </div>
    )
  }
}

export default ContactData;