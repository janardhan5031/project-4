import React, { useState,useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/input';

const emailReducer = (lastState, dispactchedAction) => {
  
  // dispatchAction is the object or some action data passed by dispatchEmail funciton in reducer

  if (dispactchedAction.type === 'USER_INPUT') {
    return { value: dispactchedAction.val, isValid: dispactchedAction.val.includes('@') }
  }
  if (dispactchedAction.type === 'INPUT_BLUR') {
    // check the last state value and inserting them
    return { value: lastState.value, isValid: lastState.value.includes('@') }
  }

  return { value: '', isValid: false }
};

const passwordReducer = (lastState, dispatchedAction) => {

  if (dispatchedAction.type === 'USER_INPUT') {
    return { value: dispatchedAction.val , isValid: dispatchedAction.val.trim().length>6}
  }
  if (dispatchedAction.type === 'INPUT_BLUR') {
    return { value:lastState.value, isValid: lastState.value.trim().length>6 }
  }
  
  return { value:'',isValid:false}
}

const Login = (props) => {
  // const [emailState, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null },)
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value:'',isValid:null})

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  useEffect(() => {
    // here setFormIsValid function will be called after some time to avoid un-necessary render by react
    const validationTimer = setTimeout(() => {
      // console.log('checking form validity')
        setFormIsValid(
          emailIsValid && passwordIsValid
        );
    }, 500)

    // returning cleanup function that will called in the next useEffect cycle before useEffect excutes
    return () => {
      clearTimeout(validationTimer)
    }    
  },[emailIsValid,passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
    
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',val:event.target.value})

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
    }
    else if (!emailIsValid) {
      emailInputRef.current.focus()
    }
    else {
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id='password'
          label='password'
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={false}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
