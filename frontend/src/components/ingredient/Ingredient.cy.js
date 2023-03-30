import Ingredient from "./Ingredient";
import { act, render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

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

  // describe("My Component", () => {
  //   beforeEach(() => {
  //     fetchMock.resetMocks();
  //   });
  //   it("should render the component and fetch data", async () => {
  //     fetchMock.mockResponseOnce(JSON.stringify({ data: "test" }));

  //     render(<Ingredient />);

  //     userEvent.click(screen.getByRole("button", { name: /find recipes/i }));

  //     await act(async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 0));
  //     });

  //     expect(fetchMock).toHaveBeenCalledWith("https://api.example.com/recipes");
  //     expect(screen.getByText("test")).toBeInTheDocument();
  //   });
  // });
});
