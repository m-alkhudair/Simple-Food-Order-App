import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  // to make sure we always render 2 decimal places
  const price = `$${props.price.toFixed(2)}`;

  // we're setting up the add to cart function here because we're working with all single meals elements. hence we'll use context here. We're 
  const addItemToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addItemToCartHandler} id={props.id} /> 
        {/* then we will go to Available meals to pass the id prop to MealItem */}
      </div>
    </li>
  );
};

export default MealItem;
