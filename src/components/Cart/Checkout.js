// import classes from "./Checkout.module.css";

// const Checkout = (props) => {
//     const confirmHandler = event => {
//         event.preventDefault();
//         // to ensure that the browser default of sending an http request is prevented
//     }

//   return (
//     <form onSubmit={confirmHandler}>
//       <div className={classes.control}>
//         <label htmlFor="name">Your Name</label>
//         <input type="text" id="name" />
//       </div>
//       <div className={classes.control}>
//         <label htmlFor="street">Street</label>
//         <input type="text" id="street" />
//       </div>
//       <div className={classes.control}>
//         <label htmlFor="postal">Postal Code</label>
//         {/* postal code is text because we dont want zero to be treated as a null value */}
//         <input type="text" id="postal" />
//       </div>
//       <div className={classes.control}>
//         <label htmlFor="city">City</label>
//         <input type="text" id="city" />
//       </div>
//       <dive className={classes.actions}>
//         {/* !!!!!! the cancel button is tyep button so it doesnt submit the form!!!!!!!!!!!! */}
//         <button type="button" onClick={props.onCancel}>Cancel</button>
//         <button>Confirm</button>
//       </dive>
//     </form>
//   );
// };

// export default Checkout;

import { useState, useRef } from "react";
import classes from "./Checkout.module.css";

// Helper functions for validation:
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // allways .current gives access to the actual value stored in the ref, also every js input object has a value property that contain the actual value entered!
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // the validation:
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
        return;
    }

    // submit the cart data
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;


//   consider add a custom form hook for form validation
// like in the previous section dedicated to forms and form validity!
// listen for touched state and clearing errors when typing 

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
