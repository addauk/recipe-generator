import Ingredient from './Ingredient'
const navigate = () => {}

describe("Ingredeint", () => {
  it("checks the item/s is checked", () => {
    cy.mount(<Ingredient navigate={navigate}/>)

    cy.intercept('POST', '/')

    cy.get('input[value="Chicken"]').check();
    cy.get('input[value="Mushroom"]').check();

    //cy.get('input[type="checkbox"]').check(["Chicken", "Mushroom"]);
    //cy.get('input[type="checkbox"]').should("be.checked");
    cy.contains("Items checked are: Chicken, Mushroom");
    })
  
    it("generates recipes that match the ingredients selected", () => {
      const recipeList = [
        {
          title: 'Chicken Casserole',
          ingredients: ['Chicken', 'Carrots', 'Mushroom', 'Flour', 'Garlic', 'Celery', 'Onion'],
          instructions: 'Heat a knob of butter and ½ tbsp rapeseed or olive oil in a large frying pan.',
        },
        {
          title: 'Beef lasagne',
          ingredients: ['Beef', 'Onion', 'Tomato', 'Celery', 'Stock', 'Pasta', 'Milk', 'Cheese'],
          instructions:
            'To make the Bolognese, heat the oil in a large heavy based saucepan over medium heat.',
        },
      ];

      cy.stub(window, 'fetch').resolves({
        ok: true,
        json: () => Promise.resolve(recipeList),
      });

      cy.mount(<Ingredient navigate={navigate}/>);
      cy.get('input[value="Chicken"], input[value="Carrots"], input[value="Mushroom"]').check();
      cy.get('button[type="submit"]').click();
      cy.get('.matched-recipes').should('exist');
      cy.get('.matched-recipes h3').contains('Chicken Casserole');
    })  
});
