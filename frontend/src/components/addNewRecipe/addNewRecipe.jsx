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
    inputValue: "",
    IngredientQuantities: [],
    Instructions: [],
    AuthorName: '',
    CookTime: '',
    PrepTime: '',
    TotalTime: '',
    RecipeCategory: 'Breakfast',
    RecipeServings: '',
    ImageLinks: [],
    isModalOpen: false,
    selectedIngredientIndex: null
   }

   handleOpenModal = (index) => {
    this.setState({
      isModalOpen: true,
      selectedIngredientIndex: index
    });
   };

   handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      selectedIngredientIndex: null,
    })
   }

   handleAddIngredient = () => {
    const newIngredient = this.state.inputValue.trim().toLocaleLowerCase();
    if (newIngredient !== "" && !this.state.Ingredients.includes(newIngredient)) {
      const newIngredientQuantity = "";
      this.setState(prevState => ({
        Ingredients: [...prevState.Ingredients, newIngredient],
        IngredientQuantities: [...prevState.IngredientQuantities, newIngredientQuantity],
        inputValue: ""
      }));
    }
   }

   handleRemoveIngredient = (index) => {
    const newIngredients = [...this.state.Ingredients];
    newIngredients.splice(index, 1);
    this.setState({ Ingredients: newIngredients });
  };

  async handleSubmit(event) {
    event.preventDefault();

    await axios.post("/recipe/new", this.state)
      .then(response => {
        console.log(response);
        console.log("SUCCESS");
        this.setState({
          Name: '',
          Description: '',
          Ingredients: [],
          inputValue: "",
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
          
          <label htmlFor="ingredients">Ingredients:</label><br/>
          {this.state.Ingredients.map((ingredient, index) => (
                <div className="addedIngedientContainer" key={index}>
                  <div className="ingredientsAdded">
                    <label className="ingredientName">{ingredient}</label>
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
                    <button className="addInstructionsButton" onClick={() => this.handleOpenModal(index)}>Add Instructions</button>
                    <button className="removeIngredientButton" onClick={() => this.handleRemoveIngredient(index)}>Remove Ingredient</button>
                  </div>
                </div>
            ))}
          {/* <div className="addedIngredients">
            <h2>Your Current Ingredients:</h2>
            <hr />
            {this.state.Ingredients.map((ingredient, index) => (
              <div className="addedIngedientItem" key={index}>
                <ul>
                  <li className="ingredient">{ingredient}</li>
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
                    placeholder="Qty"
                  />
                  <button className="addInstructionsButton" onClick={() => this.handleOpenModal(index)}>Add Instructions</button>
                  <button className="removeIngredientButton" onClick={() => this.handleRemoveIngredient(index)}>Remove Ingredient</button>
                </ul>
                <hr />
              </div>
            ))}
          </div> */}
          <input className="addIngredientTextbox" type="text" id="ingredients" name="ingredients" value={this.state.inputValue} onChange={(event) => this.setState({inputValue: event.target.value})} placeholder="Add Ingredient Here"/><br/>
          <button className="addIngredientButton" onClick={this.handleAddIngredient}>Add Ingredient</button>

          <label htmlFor="instructions">Instructions:</label><br/>
          <textarea required id="instructions" name="instructions" value={this.state.searchValue} onChange={this.handleSearchInputChange} onKeyPress={this.handleSearchInputKeyPress}></textarea><br/>

          <label htmlFor="author-name">Author Name:</label><br/>
          <input required type="text" id="author-name" name="author-name" value={this.state.AuthorName} onChange={(event) => this.setState({AuthorName: event.target.value})}/><br/>

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