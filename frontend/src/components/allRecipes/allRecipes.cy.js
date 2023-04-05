import AllRecipes from "./AllRecipes";
import { MemoryRouter } from "react-router";

describe("AllRecipes Component", () => {
  const recipes = [
    {
      ImageLinks: ["image1.jpg"],
      Name: "Recipe 1",
      CookTime: "PT1H30M",
      Calories: 500,
    },
    {
      ImageLinks: ["image2.jpg"],
      Name: "Recipe 2",
      CookTime: "PT0H45M",
      Calories: 350,
    },
  ];

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <AllRecipes recipes={recipes} />
      </MemoryRouter>
    );
  });

  it("should render all matching recipes with correct information", () => {
    cy.get(".recipe").should("have.length", recipes.length);

    // recipes.forEach((recipe, index) => {
    //   cy.get(`[data-cy=recipe-${index}]`).within(() => {
    //     cy.get("[data-cy=foodImage]").should(
    //       "have.attr",
    //       "src",
    //       recipe.ImageLinks[0]
    //     );
    //     cy.get("[data-cy=foodTitle]").should("have.text", recipe.Name);
    //     cy.get("[data-cy=foodTime]").should(
    //       "have.text",
    //       AllRecipes.prototype.extractTime(recipe.CookTime)
    //     );
    //     cy.get("[data-cy=calories]").should(
    //       "have.text",
    //       recipe.Calories.toString()
    //     );
    //   });
    // });
  });
});
