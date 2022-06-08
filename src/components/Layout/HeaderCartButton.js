import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  // review object destructuring. we extract the items array from the cartCtx object
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((acc, item)=>{
      return acc + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() =>{
    // if there are no items dont animate
    if (items.length === 0) {
      return;
    }

    // animate the cart btn
    setBtnIsHighlighted(true);

    // set to false again to reanimate again later
    const timer = setTimeout(()=>{
      setBtnIsHighlighted(false);
    }, 300);

    // any function being returned by the useEffect is a CLEANUP function by default!
    // its always good practice to clean up any sideEffect or timers
    return () => {
      // this also helps if we rapidly click the button,
      clearTimeout(timer)
    };

  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
