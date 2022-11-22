import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";
//
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  console.log(action.val + "  " + action.type);
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
const Login = (props) => {
  //email check and validity
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // =>
  //const [state, dispatchFn] = useReducer(reducerFn, intitialState, initFn);
  // =>
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  //password check and validity
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  //form validity
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(()=>{
  //   console.log("Effect running");
  // })

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]); //rechecks whenever they are changed
  //only add variables or functions that could change because component or parent component re-renders

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR", //onBlur={validatePasswordHandler}
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authContx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.activate();
    } else {
      passwordInputRef.current.activate();
    }
  };

  const authContx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
