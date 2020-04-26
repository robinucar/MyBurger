import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {

        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Fullname'
          },
          value: ''
        },

        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
        },
        value: ''
      },
        flat: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'House Name'
        },
        value: ''
      },
        number: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: 'Flat Number'
        },
        value: ''
      },
        postCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Post Code'
        },
        value: ''
      },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'City'
        },
        value: ''
      },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'E-mail'
        },
        value: ''
      },
        telNumber: {
          elementType: 'input',
          elementConfig: {
            type: 'tel',
            placeholder: 'Phone Number'
        },
        value: ''
      },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ],
        },
        value: ''
      },

    },

    loading: false
  }

  inputChangeHandler = (event, inputIdenfitier) => {
    console.log(event.target.value)
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdenfitier]
    };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderForm[inputIdenfitier] = updatedOrderFormElement;
    this.setState({
      orderForm: updatedOrderForm
    })
  }

  orderHandler = (event) => {
    event.preventDefault();
     this.setState( { loading: true } );
     const formData = {}
     for (let formElementIdentifier in this.state.orderForm) {
       formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
     }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData


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
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    };
    let form = (
      <form onSubmit = {this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
              key = {formElement.id}
              elementType = {formElement.config.elementType}
              elementConfig = {formElement.config.elementConfig}
              value = {formElement.config.value}
              changed={(event) => this.inputChangeHandler(event, formElement.id) }/>
        ))}

        <Button btnType='Success'>Order</Button>

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