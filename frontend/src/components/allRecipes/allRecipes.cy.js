import AllRecipes from "./AllRecipes";
import { BrowserRouter } from "react-router-dom";

describe("AllRecipes", () => {
  const recipes = [
    {
      Name: "Recipe 1",
      ImageLinks: ["https://example.com/image1.jpg"],
      CookTime: "PT30M",
      Calories: 500,
    },
    {
      Name: "Recipe 2",
      ImageLinks: ["https://example.com/image2.jpg"],
      CookTime: "PT1H",
      Calories: 800,
    },
  ];
  it("displays all matching recipes with the correct information", () => {
    cy.mount(<AllRecipes recipes={recipes} />);

    cy.get(".grid").find(".recipe").should("have.length", 2);

    cy.get(".recipe")
      .first()
      .within(() => {
        cy.get("img").should("be.visible");
        cy.get(".title").should("contain", "Recipe 1");
        cy.get(".cooking-time").should("contain", "30 minutes");
        cy.get(".calories").should("contain", "500");
        cy.get(".details-button").click();
      });

    // test that the recipe details page loads correctly
    cy.url().should("include", "/recipe-details");
    cy.get(".recipe-details").should("be.visible");
  });
});
