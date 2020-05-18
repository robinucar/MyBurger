import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
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
        maxLength: 8
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
      value: 'fastest',
      validation: {},
      valid:true,
      }
    });
    const [formIsValid, setFormIsValid] = useState(false);



    const inputChangeHandler = (event, inputIdenfitier) => {

    const updatedOrderFormElement = updateObject(orderForm[inputIdenfitier], {
      value: event.target.value,
      valid: checkValidity( event.target.value, orderForm[inputIdenfitier].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdenfitier]: updatedOrderFormElement
    })

    let formIsValid = true;
    for(let inputIdenfitiers in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdenfitiers].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);

  }

  const orderHandler = (event) => {
    event.preventDefault();
     const formData = {}
     for (let formElementIdentifier in orderForm) {
       formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
     }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId


        }

        props.onOrderBurger(order, props.token)

  }


    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    };
    let form = (
      <form onSubmit = {orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
              key = {formElement.id}
              elementType = {formElement.config.elementType}
              elementConfig = {formElement.config.elementConfig}
              value = {formElement.config.value}
              inValid = {!formElement.config.valid}
              shouldValidate = {formElement.config.validation}
              touched = {formElement.config.touch}
              changed = {(event) => inputChangeHandler(event, formElement.id) }/>
        ))}

        <Button btnType='Success' disabled={!formIsValid}>Order</Button>

    </form>
    );
    if (props.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please add your contact details...</h4>
        {form}
      </div>
    )

}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));