import UserProfile from "./Profile";

describe("UserProfile component", () => {
  const user = {
    _id: "123",
    userName: "TestUser",
    bio: "This is a test bio",
  };

  beforeEach(() => {
    cy.intercept(`/users/${user._id}`, { body: user }).as("getUserInfo");
    cy.mount(<UserProfile user={user} />);
  });

  it("should render the user name and bio", () => {
    cy.get(".user-profile")
      .should("contain", user.userName)
      .should("contain", user.bio);
  });

  it("should allow the user to edit their bio", () => {
    cy.get("button").contains("Edit Bio").click();

    cy.get("textarea")
      .should("have.value", user.bio)
      .clear()
      .type("This is the new bio");

    cy.get("button").contains("Save").click();

    cy.get(".user-profile")
      .should("contain", "This is the new bio")
      .should("not.contain", user.bio);
  });

  it("should cancel editing and restore the original bio", () => {
    cy.get("button").contains("Edit Bio").click();

    cy.get("textarea")
      .should("have.value", user.bio)
      .clear()
      .type("This is the new bio");

    cy.get("button").contains("Cancel").click();

    cy.get(".user-profile")
      .should("contain", user.bio)
      .should("not.contain", "This is the new bio");
  });

  it("should log out the user and redirect to login page", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", "fake_token");
      win.localStorage.setItem("userData", JSON.stringify(user));
    });

    cy.get("button").contains("Logout").click();
    cy.wait(1000);

    cy.url().should("include", "/login");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
      expect(win.localStorage.getItem("userData")).to.be.null;
    });
  });
});
