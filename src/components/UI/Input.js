import classes from './Input.module.css';

const Input  = props =>{
    return <div className={classes.input}>
        {/* rember that labels and inputs need a for and id tag to connect them together */}
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* the props.input object contains the id variable we need, the spread operator allows us to put all the objects key-value pairs no matter how many we, we can configure it from outside making it very configurable and reusable*/}
        <input {...props.input} />
    </div>
};

export default Input;