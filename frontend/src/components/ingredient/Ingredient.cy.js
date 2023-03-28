import Ingredient from "./Ingredient";
const navigate = () => {};

describe("Ingredeint", () => {
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

  it("generates recipes that match the ingredients selected", () => {
    const recipeList = [
      {
        image:
          "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/39/picM9Mhnw.jpg",
        title: "Chicken Casserole",
        cookingTime: "60",
        rating: "3",
        ingredients: [
          "Chicken",
          "Carrot",
          "Mushroom",
          "Flour",
          "Garlic",
          "Celery",
          "Onion",
        ],
        instructions:
          "Heat a knob of butter and ½ tbsp rapeseed or olive oil in a large frying pan.",
      },
      {
        image:
          "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/picfnmxck.jpg",
        title: "Beef lasagne",
        cookingTime: "90",
        rating: "4",
        ingredients: [
          "Beef",
          "Onion",
          "Tomato",
          "Celery",
          "Stock",
          "Pasta",
          "Milk",
          "Cheese",
        ],
        instructions:
          "To make the Bolognese, heat the oil in a large heavy based saucepan over medium heat.",
      },
    ];

    cy.stub(window, "fetch").resolves({
      ok: true,
      json: () => Promise.resolve(recipeList),
    });

    cy.mount(<Ingredient navigate={navigate} />);
    cy.get(
      'input[value="Chicken"], input[value="Carrot"], input[value="Mushroom"]'
    ).check();
    cy.get('button[type="submit"]').click();

    cy.get(".matched-recipes").within(() => {
      cy.get("[data-cy='foodName']").should("have.text", "Chicken Casserole");
      cy.get("[data-cy='foodName']").should("not.have.text", "Beef lasagne");
    });
  });
});
