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
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touch: false
        },

        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
        flat: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'House Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
        number: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: 'Flat Number'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
        postCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Post Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touch: false
      },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
        telNumber: {
          elementType: 'input',
          elementConfig: {
            type: 'tel',
            placeholder: 'Phone Number'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
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

  checkValidity (value, rules) {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }

  inputChangeHandler = (event, inputIdenfitier) => {

    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdenfitier]
    };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
    updatedOrderFormElement.touch = true
    updatedOrderForm[inputIdenfitier] = updatedOrderFormElement;
    console.log(updatedOrderFormElement)
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
              inValid = {!formElement.config.valid}
              shouldValidate = {formElement.config.validation}
              touched = {formElement.config.touch}
              changed = {(event) => this.inputChangeHandler(event, formElement.id) }/>
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