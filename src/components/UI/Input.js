import React from 'react';
import classes from './Input.module.css';

// forwardRef set up is the second step of getting refs to work on our custom input component inside the MealItemForm.
// Observe the ref argument and the ref attribute bellow
const Input  = React.forwardRef((props, ref) =>{
    return <div className={classes.input}>
        {/* rember that labels and inputs need a for and id tag to connect them together */}
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* the props.input object contains the id variable we need, the spread operator allows us to put all the objects key-value pairs no matter how many we, we can configure it from outside making it very configurable and reusable*/}
        <input ref={ref} {...props.input} />
    </div>
});

export default Input;