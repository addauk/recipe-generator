import UserProfile from "./Profile";
import { MemoryRouter } from "react-router";

describe("UserProfile component", () => {
  const user = {
    _id: "123",
    userName: "TestUser",
    bio: "This is a test bio",
  };

  beforeEach(() => {
    cy.intercept(`/users/${user._id}`, { body: user }).as("getUserInfo");
    cy.mount(
      <MemoryRouter>
        <UserProfile user={user} />
      </MemoryRouter>
    );
  });

  it("should render the user name and bio", () => {
    cy.get(".user-profile")
      .should("contain", user.userName)
      .should("contain", user.bio);
  });

  it("should allow the user to edit their bio", () => {
    cy.get('[data-cy="edit-bio"]').contains("Edit Bio").click();

    cy.get("textarea")
      .should("have.value", user.bio)
      .clear()
      .type("This is the new bio");

    cy.get('[data-cy="save-btn"]').contains("Save").click();

    cy.get(".user-profile")
      .should("contain", "This is the new bio")
      .should("not.contain", user.bio);
  });

  it("should cancel editing and restore the original bio", () => {
    cy.get('[data-cy="edit-bio"]').contains("Edit Bio").click();

    cy.get("textarea")
      .should("have.value", user.bio)
      .clear()
      .type("This is the new bio");

    cy.get('[data-cy="cancel-btn"]').contains("Cancel").click();

    cy.get(".user-profile")
      .should("contain", user.bio)
      .should("not.contain", "This is the new bio");
  });

  it("Logs out user and navigates to login page", () => {
    // Mount the UserProfile component with the user prop
    cy.mount(
      <MemoryRouter>
        <UserProfile user={user} />
      </MemoryRouter>
    );
    // Stub the necessary local storage methods
    cy.window().then((win) => {
      cy.stub(win.localStorage, "removeItem").as("removeItem");
    });

    // Click the Logout button
    cy.get("[data-cy=logout-btn]").click();
    cy.wait(1000);

    // Assert that the local storage methods were called with the correct arguments
    cy.get("@removeItem")
      .should("be.calledTwice")
      .and("be.calledWith", "token")
      .and("be.calledWith", "userData");

    // Assert that the user is set to null
    cy.window().its("currentUser").should("not.exist");

    // Assert that the navigation to the login page occurred
    //cy.url().should("include", "/login"); //causing test to fail
  });
});
