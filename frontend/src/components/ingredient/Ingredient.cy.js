import Ingredient from "./Ingredient";

const navigate = () => {};

describe("Ingredient", () => {
  it("checks the item/s is checked", () => {
    cy.mount(<Ingredient navigate={navigate} />);

    cy.intercept("POST", "/");

    cy.get('input[value="Chicken"]').check();
    cy.get('input[value="Mushroom"]').check();
    cy.contains("Items checked are: Chicken, Mushroom");
  });

  it("unchecks all the items selected", () => {
    cy.mount(<Ingredient navigate={navigate} />);

    cy.intercept("POST", "/");

    cy.get("input[type='checkbox']").eq(0).check();
    cy.get("input[type='checkbox']").eq(1).check();
    cy.contains("Uncheck All").click();
    cy.get("input[type='checkbox']").each((checkbox) => {
      expect(checkbox).to.not.be.checked;
    });
  });

  // it.only("generates recipes that match the ingredients selected", () => {
  //   const recipeList = [
  //     { Name: "Chicken Casserole", CookingTime: "PT1H23M", Calories: "503" },
  //     { Name: "Afredo Pasta", CookingTime: "PT1H3M", Calories: "489" },
  //   ];

  //   cy.intercept(
  //     "https://westeurope.azure.data.mongodb-api.com/app/recipe_api-eixns/endpoint/recipes",
  //     recipeList
  //   ).as("getRecipes");
  //   console.log(recipeList);
  //   cy.mount(<Ingredient />);

  //   cy.get(
  //     'input[value="Chicken"], input[value="Carrots"], input[value="Mushroom"]'
  //   ).check();
  //   cy.get('button[type="submit"]').click();

  //   cy.wait("@getRecipes").its("response.statusCode").should("eq", 200);
  //   cy.get(".matched-recipes").should("exist");
  //   cy.get(".matched-recipes").contains("Chicken Casserole");
  // });

  it("generates recipes that match the ingredients selected", () => {
    const recipeList = [
      { Name: "Chicken Casserole", CookingTime: "PT1H23M", Calories: "503" },
      { Name: "Afredo Pasta", CookingTime: "PT1H3M", Calories: "489" },
    ];

    cy.intercept(
      "https://westeurope.azure.data.mongodb-api.com/app/recipe_api-eixns/endpoint/recipes",
      recipeList
    ).as("getRecipes");

    cy.mount(<Ingredient />);

    cy.get(
      'input[value="Chicken"], input[value="Carrots"], input[value="Mushroom"]'
    ).check();
    cy.get('button[type="submit"]').click();

    cy.wait("@getRecipes");

    cy.get('[data-cy="matched-recipes"]').should(
      "contain.text",
      "Chicken Casserole"
    );
  });
});
