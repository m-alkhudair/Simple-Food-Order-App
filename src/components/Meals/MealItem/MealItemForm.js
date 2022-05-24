import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        //   The item in the object input contain default attributes that we find on normal html input elements
        input={{
          id: "amount_" + props.id, //this changed to allow the label to to point to its respective input, for accessability. after this we will go to MealItemForm in MealItem to accept the id prop
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
