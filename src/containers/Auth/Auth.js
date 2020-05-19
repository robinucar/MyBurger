import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';


const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'User E-mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touch: false
    },

    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touch: false
    }
  });

  const [isSignup, setIsSignup] = useState(true);
  const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;
  useEffect( () => {
    if(!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
  }
  }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath] )

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true
      })
    });
    setAuthForm(updatedControls)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)

  }


    const formElementsArray = [];
    for (let key in authForm) {
      formElementsArray.push({
        id: key,
        config: authForm[key]
      });
    };

    let form = formElementsArray.map(formElement => (
      <Input
        key= {formElement.id}
        elementType = {formElement.config.elementType}
        elementConfig = {formElement.config.elementConfig}
        value = {formElement.config.value}
        inValid = {!formElement.config.valid}
        shouldValidate = {formElement.config.validation}
        touched = {formElement.config.touch}
        changed = {(event) => inputChangeHandler(event, formElement.id) }
      />
    ));

    if(props.loading){
      form = <Spinner />
    };

    let errorMessage = null;
    if(props.error) {
      errorMessage = (
        <p>{props.error.message}</p>
      )
    }
    const errorStyle = {
      color: 'red'
    }

    let authRedirect = null;
    if(props.isAuthenticated){
      authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
      <div className= {classes.Auth}>
        {authRedirect}
        <div style={errorStyle}>{errorMessage}</div>

        <form onSubmit={submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
          <Button
            clicked={switchAuthModeHandler}
            btnType='Danger'>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </form>
      </div>
    )

}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
} ;

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);