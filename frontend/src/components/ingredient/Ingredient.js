import React, { useState, useEffect } from "react";

const Ingredient = ({navigate}) => {
const ingredientList= ["Chicken", "Turkey", "Bacon", "Pepper", "Potato", "Milk", "Cheese", "Beef",  "Pork",  "Fish",  "Shrimp",  "Rice",  "Pasta"];
//   const [ingredients, setIngredients] = useState("");
const [checked, setChecked] = useState([]);


//   const fetchIngredients = () => {
//   }
// }

// useEffect(() => {
//   setIngredients();
 

const handleCheck = (event) => {
  let updatedList = [...checked];
   if (event.target.checked) {
     updatedList = [...checked, event.target.value];
   } else {
     updatedList.splice(checked.indexOf(event.target.value), 1);
   }
   setChecked(updatedList);
 };

 let checkedItems= checked.length
 ? checked.reduce((total, item) => {
  return total + ", " + item;
 })
 : "";

 var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

return (
  <>
  <div className="recipe-generator"></div>
  <div className="ingredient-header"></div>
  <div className="list-container">
    <h2>Ingredients</h2>
    
      {ingredientList.map((item, index) => (
         <div key={index}>
         <input value={item} type="checkbox" onChange={handleCheck} />
         <span className={isChecked(item)}>{item}</span>
       </div>
      ))}
    <div>
      {`Items checked are: ${checkedItems}`}
    </div>
    <button type="submit">Submit</button>
  </div>
  </>
)};

export default Ingredient;