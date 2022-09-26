import React from "react";

// Just some default values for better auto completion
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;
