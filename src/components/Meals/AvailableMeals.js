import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(); //undifinied initially

  useEffect(()=>{
    // it is not allowed to return a promis inside useEffect, they only thing to be returned is a cleanup function, hence it is not allowed to use async straight on the callback function, do this instead:
    const fetchMeals = async () => {
      const response = await fetch('https://http-tutorial-tasks-app-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      };

      const responseData = await response.json();

      // now we want to transform the object we get into an array!
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      };

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch(error=>{
      setIsLoading(false);
      setHttpError(error.message);
    });

    // we will no use try catch because if we throw an error in an async function the promise will be rejected so we would have to use await in the try block , but we cant do that unless we turn the useEffect function into an async function, but that is not allowed. so we have to use .then() and .catch()
    // so the best method is the above!
    // try {
    //   fetchMeals();
    // } catch(error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }

  }, [])

  if (isLoading) {
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>
  }

  // meals instead of DUMMY_MEALS
  const mealsList = meals.map((meal) => {
    // return <li>{meal.name}</li>;
    return (
      <MealItem
        id={meal.id} //this is the final step in fixing the id issue for accessability
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
