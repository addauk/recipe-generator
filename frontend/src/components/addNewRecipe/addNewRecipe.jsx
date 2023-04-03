import { Component } from "react";
import '../addNewRecipe/addNewRecipe.css'
import axios from "axios";

class AddNewRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = { 
    name: '',
    description: '',
    ingredient: '',
    ingredientQuantities: '',
    instructions: '',
    authorName: '',
    cookingTime: '',
    prepTime: '',
    totalTime: '',
    category: '',
    servings: '',
    imageUpload: ''
   }

  handleSubmit(event) {
    event.preventDefault();

    axios.post("/recipe/new", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() { 
    return (
      <div className="formAddNewRecipe">
        <form ref={(el) => this.form = el}>
          <label htmlFor="recipe-name">Recipe Name:</label><br/>
          <input type="text" id="recipe-name" name="recipe-name" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/><br/>

          <label htmlFor="recipe-description">Recipe Description:</label><br/>
          <textarea id="recipe-description" name="recipe-description" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}></textarea><br/>

          <label htmlFor="ingredients">Ingredients:</label><br/>
          <input type="text" id="ingredients" name="ingredients" value={this.state.ingredients} onChange={(event) => this.setState({ingredients: event.target.value})}/><br/>

          <label htmlFor="ingredient-quantities">Ingredient Quantities:</label><br/>
          <input type="text" id="ingredient-quantities" name="ingredient-quantities" value={this.state.ingredientQuantities} onChange={(event) => this.setState({ingredientQuantities: event.target.value})}/><br/>

          <label htmlFor="instructions">Instructions:</label><br/>
          <textarea id="instructions" name="instructions" value={this.state.instructions} onChange={(event) => this.setState({instructions: event.target.value})}></textarea><br/>

          <label htmlFor="author-name">Author Name:</label><br/>
          <input type="text" id="author-name" name="author-name" value={this.state.authorName} onChange={(event) => ({authorName: event.target.value})}/><br/>

          <label htmlFor="cooking-time">Cooking Time:</label><br/>
          <input type="text" id="cooking-time" name="cooking-time" value={this.state.cookingTime} onChange={(event) => ({cookingTime: event.target.value})}/><br/>

          <label htmlFor="preparation-time">Preparation Time:</label><br/>
          <input type="text" id="preparation-time" name="preparation-time" value={this.state.prepTime} onChange={(event) => ({prepTime: event.target.value})}/><br/>

          <label htmlFor="total-time">Total Time:</label><br/>
          <input type="text" id="total-time" name="total-time" value={this.state.totalTime} onChange={(event) => ({totalTime: event.target.value})}/><br/>

          <label htmlFor="recipe-category">Recipe Category:</label><br/>
          <select id="recipe-category" name="recipe-category" value={this.state.category} onChange={(event) => ({category: event.target.value})}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select><br/>

          <label htmlFor="recipe-servings">Recipe Servings:</label><br/>
          <input type="text" id="recipe-servings" name="recipe-servings" value={this.state.servings} onChange={(event) => ({servings: event.target.value})}/><br/>

          <label htmlFor="image-upload">Image Upload:</label><br/>
          <input type="file" id="image-upload" name="image-upload" multiple value={this.state.imageUpload} onChange={(event) => ({imageUpload: event.target.value})}/><br/>

          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>

      
    );
  }
}
 
export default AddNewRecipe;