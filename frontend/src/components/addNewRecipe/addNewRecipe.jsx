import { Component } from "react";
import '../addNewRecipe/addNewRecipe.css'
import axios from "axios";

class AddNewRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = { 
    Name: '',
    Description: '',
    Ingredients: [],
    IngredientQuantities: [],
    Instructions: '',
    AuthorName: '',
    CookTime: '',
    PrepTime: '',
    TotalTime: '',
    RecipeCategory: '',
    RecipeServings: '',
    ImageLinks: []
   }

  async handleSubmit(event) {
    event.preventDefault();

    await axios.post("/recipe/new", this.state)
      .then(response => {
        console.log(response);
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log(error);
        console.log("FAIL");
      });
  }

  render() { 
    return (
      <div className="formAddNewRecipe">
        <form>
          <label htmlFor="recipe-name">Recipe Name:</label><br/>
          <input type="text" id="recipe-name" name="recipe-name" value={this.state.Name} onChange={(event) => this.setState({Name: event.target.value})}/><br/>

          <label htmlFor="recipe-description">Recipe Description:</label><br/>
          <textarea id="recipe-description" name="recipe-description" value={this.state.Description} onChange={(event) => this.setState({Description: event.target.value})}></textarea><br/>

          <label htmlFor="ingredients">Ingredients:</label><br/>
          <input type="text" id="ingredients" name="ingredients" value={this.state.Ingredients} onChange={(event) => this.setState({Ingredients: event.target.value})}/><br/>

          <label htmlFor="ingredient-quantities">Ingredient Quantities:</label><br/>
          <input type="text" id="ingredient-quantities" name="ingredient-quantities" value={this.state.IngredientQuantities} onChange={(event) => this.setState({IngredientQuantities: event.target.value})}/><br/>

          <label htmlFor="instructions">Instructions:</label><br/>
          <textarea id="instructions" name="instructions" value={this.state.Instructions} onChange={(event) => this.setState({Instructions: event.target.value})}></textarea><br/>

          <label htmlFor="author-name">Author Name:</label><br/>
          <input type="text" id="author-name" name="author-name" value={this.state.AuthorName} onChange={(event) => this.setState({AuthorName: event.target.value})}/><br/>

          <label htmlFor="cooking-time">Cooking Time:</label><br/>
          <input type="text" id="cooking-time" name="cooking-time" value={this.state.CookTime} onChange={(event) => this.setState({CookTime: event.target.value})}/><br/>

          <label htmlFor="preparation-time">Preparation Time:</label><br/>
          <input type="text" id="preparation-time" name="preparation-time" value={this.state.PrepTime} onChange={(event) => this.setState({PrepTime: event.target.value})}/><br/>

          <label htmlFor="total-time">Total Time:</label><br/>
          <input type="text" id="total-time" name="total-time" value={this.state.TotalTime} onChange={(event) => this.setState({TotalTime: event.target.value})}/><br/>

          <label htmlFor="recipe-category">Recipe Category:</label><br/>
          <select id="recipe-category" name="recipe-category" value={this.state.RecipeCategory} onChange={(event) => this.setState({RecipeCategory: event.target.value})}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select><br/>

          <label htmlFor="recipe-servings">Recipe Servings:</label><br/>
          <input type="text" id="recipe-servings" name="recipe-servings" value={this.state.RecipeServings} onChange={(event) => this.setState({RecipeServings: event.target.value})}/><br/>

          <label htmlFor="image-upload">Image Upload:</label><br/>
          <input type="file" id="image-upload" name="image-upload" multiple value={this.state.ImageLinks} onChange={(event) => this.setState({ImageLinks: event.target.value})}/><br/>

          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>

      
    );
  }
}
 
export default AddNewRecipe;