import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// the state arg. is latest state snapshot and is provided by react automatically
// the first arg. of the dispatch function will be in the action arg. below
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    
    // this is the first step in checking whether the newly added item exists aleardy
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    // let updatedItem;
    let updatedItems;

    // check if truthy
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      // overriding the old item in the array with the updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // the case its a brand new item
      // updatedItem = {...action.item};
      // updatedItems = state.items.concat(updatedItem);
      updatedItems = state.items.concat(action.item);

    }

    // conact() because we want to always edit array in immutable ways, because we dont want to change the orginal array instead of editing the old array in memory so we return a new one
    // const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", item: id });
  };

  // real concrete object that is our context that we will maipulate and use
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
