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
    AuthorId: `${JSON.parse(window.localStorage.getItem('userData'))._id}`,
    AuthorName: `${JSON.parse(window.localStorage.getItem('userData')).userName}`,
    CookTimeMinutes: '',
    CookTimeHours: '',
    CookTime: '',
    PrepTimeMinutes: '',
    PrepTimeHours: '',
    PrepTime: '',
    TotalTimeMinutes: '',
    TotalTimeHours: '',
    TotalTime: '',
    RecipeCategory: 'Breakfast',
    RecipeServings: '',
    ImageLinks: [],
    showModal: false,
   }

   handleCookTime = () => {
    console.log(`PT${this.state.CookTimeHours}H${this.state.CookTimeMinutes}M`);
    const resultCookTime = `PT${this.state.CookTimeHours}H${this.state.CookTimeMinutes}M`
    this.setState(() => ({
      CookTime: resultCookTime
    }));
   }

   handlePrepTime = () => {
    console.log(`PT${this.state.PrepTimeHours}H${this.state.PrepTimeMinutes}M`);
    const resultPrepTime = `PT${this.state.PrepTimeHours}H${this.state.PrepTimeMinutes}M`
    this.setState(() => ({
      PrepTime: resultPrepTime
    }));

    const resultMinutes = this.state.CookTimeMinutes + this.state.PrepTimeMinutes;
    const resultHours = this.state.CookTimeHours + this.state.PrepTimeHours;

    const resultTotalTime = `PT${resultHours}H${resultMinutes}M`;
    this.setState({TotalTime: resultTotalTime });
    console.log(resultTotalTime);

   }
   
   handleTotalTime = () => {
    // Creates the strings for regex
    const resultCookTime = `PT${this.state.CookTimeHours}H${this.state.CookTimeMinutes}M`
    const resultPrepTime = `PT${this.state.PrepTimeHours}H${this.state.PrepTimeMinutes}M`
  
    const resultTotalMinutes = this.state.CookTimeMinutes + this.state.PrepTimeMinutes;
    const resultTotalHoursMins = (this.state.CookTimeHours * 60) + (this.state.PrepTimeHours * 60);
    const resultTotalHours = Math.floor(resultTotalHoursMins / 60);
    const totalMinutes = resultTotalMinutes % 60;
    const resultTotalTime = `PT${resultTotalHours}H${totalMinutes}M`;
  
    this.setState(() => ({
      CookTime: resultCookTime,
      PrepTime: resultPrepTime,
      TotalTime: resultTotalTime,
      CookTimeMinutes: "",
      CookTimeHours: "",
      PrepTimeMinutes: "",
      PrepTimeHours: ""
    }));
    alert('Successfully added cooking and prep times')
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

    // const userName = JSON.parse(window.localStorage.getItem('userData')).userName;
    // if (userName !== "" && !this.state.AuthorName.includes(userName)) {
    //   const userName = "";
    //   this.setState(prevState => ({
    //     AuthorName: [...prevState.AuthorName, userName]
    //   }));
    // }
    // console.log(`Username: ${userName}`);
    // this.setState({AuthorName: `${userName}`});
    // console.log(this.state);

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
          <button className="addInstructionsButton" onClick={this.handleAddInstruction}>Add Instruction</button>
          <br></br>
          <hr />
          <br />
          {/* Cooking time container */}
          <div className="cooking-time-container">
            <label htmlFor="cooking-time">Cooking Time:</label><br/>
            <input required type="text" id="cooking-time-hours" name="cooking-time-hours" value={this.state.CookTimeHours} onChange={(event) => this.setState({CookTimeHours: event.target.value})} placeholder="Cook Time Minutes"/><br/>
            <input required type="text" id="cooking-time-minutes" name="cooking-time-minutes" value={this.state.CookTimeMinutes} onChange={(event) => this.setState({CookTimeMinutes: event.target.value})} placeholder="Cook Time Hours"/><br/>
          </div>
            <br></br>
          {/* Preparation time container */}
          <div className="preparation-time-container">
            <label htmlFor="preparation-time">Preparation Time:</label><br/>
            <input required type="text" id="preparation-time-hours" name="preparation-time-hours" value={this.state.PrepTimeHours} onChange={(event) => this.setState({PrepTimeHours: event.target.value})} placeholder="Prep Time Minutes"/><br/>
            <input required type="text" id="preparation-time-minutes" name="preparation-time-minutes" value={this.state.PrepTimeMinutes} onChange={(event) => this.setState({PrepTimeMinutes: event.target.value})} placeholder="Prep Time Hours"/><br/>
          </div>
          <br></br>
          {/* Total time container */}
          <div className="calculate-totalTime-container">
            <button className="calculate-totalTime-button" onClick={this.handleTotalTime}>Calculate Total Time</button>
          </div>
          <br />
          <hr />
          <br></br>
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