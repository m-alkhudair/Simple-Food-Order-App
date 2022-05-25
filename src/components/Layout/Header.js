import React from "react";

import HeaderCartButton from "./HeaderCartButton";
import classes from './Header.module.css';
import meals from '../../assets/meals.jpeg';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
          {/* we can also use a url if the image isnt local in that case we'll use "" instead of curly braces */}
          <img src={meals} alt="A table full of delicious food!"/>
      </div>
    </React.Fragment>
  );
};

export default Header;
