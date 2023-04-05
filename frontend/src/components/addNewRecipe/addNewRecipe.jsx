import { Component } from "react";
import '../addNewRecipe/addNewRecipe.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AddNewRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { 
    Name: '',
    Description: '',
    Ingredients: [],
    ingredientInputValue: "",
    IngredientQuantities: [],
    instructionInputValue: "",
    Instructions: [],
    AuthorName: '',
    CookTime: '',
    PrepTime: '',
    TotalTime: '',
    RecipeCategory: 'Breakfast',
    RecipeServings: '',
    ImageLinks: [],
    showModal: false,
   }

   handleAddIngredient = () => {
    const newIngredient = this.state.ingredientInputValue.trim().toLocaleLowerCase();
    if (newIngredient !== "" && !this.state.Ingredients.includes(newIngredient)) {
      const newIngredientQuantity = "";
      this.setState(prevState => ({
        Ingredients: [...prevState.Ingredients, newIngredient],
        IngredientQuantities: [...prevState.IngredientQuantities, newIngredientQuantity],
        ingredientInputValue: ""
      }));
    }
   }

   handleAddInstruction = () => {
    const newInstruction = this.state.instructionInputValue.trim();
    if (newInstruction !== "" && !this.state.Instructions.includes(newInstruction)) {
      const newInstruction = "";
      this.setState(prevState => ({
        Instructions: [...prevState.Instructions, newInstruction],
        instructionInputValue: ""
      }));
    }
   }

   handleRemoveInstruction = (index) => {
    const newInstruction = [...this.state.Instructions];
    newInstruction.splice(index, 1);
    this.setState({ instructions: newInstruction });
   }

   handleRemoveIngredient = (index) => {
    const newIngredients = [...this.state.Ingredients];
    newIngredients.splice(index, 1);
    this.setState({ Ingredients: newIngredients });
  };

  async handleSubmit(event) {
    event.preventDefault();

    const userName = JSON.parse(window.localStorage.getItem('userData')).userName;
    console.log(userName);
    this.setState({AuthorName: userName});
    console.log(this.state);

    await axios.post("/recipe/new", this.state)
      .then(response => {
        console.log(response);
        console.log("SUCCESS");
        this.setState({
          Name: '',
          Description: '',
          Ingredients: [],
          ingredientInputValue: "",
          IngredientQuantities: [],
          Instructions: [],
          AuthorName: '',
          CookTime: '',
          PrepTime: '',
          TotalTime: '',
          RecipeCategory: 'Breakfast',
          RecipeServings: '',
          ImageLinks: []
        });
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
          <input required type="text" id="recipe-name" name="recipe-name" value={this.state.Name} onChange={(event) => this.setState({Name: event.target.value})}/><br/>

          <label htmlFor="recipe-description">Recipe Description:</label><br/>
          <textarea required id="recipe-description" name="recipe-description" value={this.state.Description} onChange={(event) => this.setState({Description: event.target.value})}></textarea><br/>
          
          {/* Add Ingredients */}
          <label className="ingredientsLabel" htmlFor="ingredients">Ingredients:</label><br/>
          {this.state.Ingredients.map((ingredient, index) => (
                <div className="addedIngedientContainer" key={index}>
                  <div className="ingredientsAdded">
                    <li className="ingredientName">{ingredient}</li>
                  </div>
                  <div className="buttonContainer">
                    <input
                    required
                    className="ingredientQtyTextbox"
                    type="text"
                    id={`ingredient-quantities-${index}`}
                    name={`ingredient-quantities-${index}`}
                    value={this.state.IngredientQuantities[index]}
                    onChange={(event) => {
                      const newIngredientQuantities = [...this.state.IngredientQuantities];
                      newIngredientQuantities[index] = event.target.value;
                      this.setState({ IngredientQuantities: newIngredientQuantities });
                    }}
                    placeholder="Qty"/>
                    <button className="removeIngredientButton" onClick={() => this.handleRemoveIngredient(index)}>Remove Ingredient</button>
                  </div>
                </div>
            ))}
          <input className="addIngredientTextbox" type="text" id="ingredients" name="ingredients" value={this.state.ingredientInputValue} onChange={(event) => this.setState({ingredientInputValue: event.target.value})} placeholder="Add Ingredient Here"/><br/>
          <button className="addIngredientButton" onClick={this.handleAddIngredient}>Add Ingredient</button>


          {/* Add Instructions */}
          <label className="instructionLabel" htmlFor="instructions">Instructions:</label><br/>
          {this.state.Instructions.map((instruction, index) => (
            <div className="addedInstructionsContainer" key={index}>
              <div className="instrcutionsAdded">
                <li className="instructionName">{instruction}</li>
              </div>
                <button className="removeInstructionButton" onClick={() => this.handleRemoveInstruction(index)}>Remove Instruction</button>
              </div>
          ))}

          <input className="addInstructionsTextbox" type="text" id="instructions" name="instructions" value={this.state.instructionInputValue} onChange={(event) => this.setState({instructionInputValue: event.target.value})} placeholder="Add Instructions Here"/><br/>
          <button className="addInstructionsButton" onClick={this.handleAddInstruction}>Add Ingredient</button>

{/* 
          <label htmlFor="author-name">Author Name:</label><br/>
          <input required type="text" id="author-name" name="author-name" value={this.state} onChange={(event) => this.setState({AuthorName: event.target.value})}/><br/> */}

          <label htmlFor="cooking-time">Cooking Time:</label><br/>
          <input required type="text" id="cooking-time" name="cooking-time" value={this.state.CookTime} onChange={(event) => this.setState({CookTime: event.target.value})}/><br/>

          <label htmlFor="preparation-time">Preparation Time:</label><br/>
          <input required type="text" id="preparation-time" name="preparation-time" value={this.state.PrepTime} onChange={(event) => this.setState({PrepTime: event.target.value})}/><br/>

          <label htmlFor="total-time">Total Time:</label><br/>
          <input required type="text" id="total-time" name="total-time" value={this.state.TotalTime} onChange={(event) => this.setState({TotalTime: event.target.value})}/><br/>

          <label htmlFor="recipe-category">Recipe Category:</label><br/>
          <select required id="recipe-category" name="recipe-category" value={this.state.RecipeCategory} onChange={(event) => this.setState({RecipeCategory: event.target.value})}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select><br/>

          <label htmlFor="recipe-servings">Recipe Servings:</label><br/>
          <input type="text" id="recipe-servings" name="recipe-servings" value={this.state.RecipeServings} onChange={(event) => this.setState({RecipeServings: event.target.value})}/><br/>

          <label htmlFor="image-upload">Image Upload:</label><br/>
          <input type="file" id="image-upload" name="image-upload" multiple value={this.state.ImageLinks} onChange={(event) => this.setState({ImageLinks: event.target.value})}/><br/>

          <button type="button" value="Submit" onClick={this.handleSubmit}>Submit Recipe</button>
        </form>
      </div>
    );
  }
}
 
export default AddNewRecipe;