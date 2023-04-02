import { Component } from "react";
import '../addNewRecipe/addNewRecipe.css'

class AddNewRecipe extends Component {
  state = {  } 
  render() { 
    return (
      <div className="formAddNewRecipe">
        <form>
          <label htmlFor="recipe-name">Recipe Name:</label><br/>
          <input type="text" id="recipe-name" name="recipe-name"/><br/>

          <label htmlFor="recipe-description">Recipe Description:</label><br/>
          <textarea id="recipe-description" name="recipe-description"></textarea><br/>

          <label htmlFor="ingredients">Ingredients:</label><br/>
          <input type="text" id="ingredients" name="ingredients"/><br/>

          <label htmlFor="ingredient-quantities">Ingredient Quantities:</label><br/>
          <input type="text" id="ingredient-quantities" name="ingredient-quantities"/><br/>

          <label htmlFor="instructions">Instructions:</label><br/>
          <textarea id="instructions" name="instructions"></textarea><br/>

          <label htmlFor="author-name">Author Name:</label><br/>
          <input type="text" id="author-name" name="author-name"/><br/>

          <label htmlFor="cooking-time">Cooking Time:</label><br/>
          <input type="text" id="cooking-time" name="cooking-time"/><br/>

          <label htmlFor="preparation-time">Preparation Time:</label><br/>
          <input type="text" id="preparation-time" name="preparation-time"/><br/>

          <label htmlFor="total-time">Total Time:</label><br/>
          <input type="text" id="total-time" name="total-time"/><br/>

          <label htmlFor="recipe-category">Recipe Category:</label><br/>
          <select id="recipe-category" name="recipe-category">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select><br/>

          <label htmlFor="recipe-servings">Recipe Servings:</label><br/>
          <input type="text" id="recipe-servings" name="recipe-servings"/><br/>

          <label htmlFor="image-upload">Image Upload:</label><br/>
          <input type="file" id="image-upload" name="image-upload" multiple/><br/>

          <input type="submit" value="Submit"/>
        </form>
      </div>

      
    );
  }
}
 
export default AddNewRecipe;