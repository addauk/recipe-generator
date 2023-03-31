describe("LogInForm component", () => {
  it("should navigate to /login if there is no token", () => {
    cy.visit("/login");
    cy.location("pathname").should("equal", "/login");
  });

  it("should show error message when login fails", () => {
    cy.visit("/login");

    cy.intercept("POST", "/tokens", (req) => {
      req.reply({ statusCode: 400, body: {} });
    }).as("loginRequest");

    cy.get("#email").type("test@example.com");
    cy.get("#password").type("invalidpassword");
    cy.get("#submit").click();

    cy.wait("@loginRequest");

    cy.location("pathname").should("equal", "/login");
    cy.get("[role=error]").should("be.visible");
  });

  it("should direct to profile when login succeeds", () => {
    cy.visit("/login");

    cy.intercept("POST", "/tokens", (req) => {
      req.reply({
        statusCode: 201,
        body: {
          token: "test-token",
          user: { _id: 123, email: "test@test.com" },
        },
      });
    }).as("loginRequest");

    cy.get("#email").type("test@example.com");
    cy.get("#password").type("validpassword");
    cy.get("#submit").click();

    cy.wait("@loginRequest");

    cy.location("pathname").should("contain", "/users");
    cy.get("[role=alert]").should("not.exist");
  });

  it("should navigate to signup page when signup button is clicked", () => {
    cy.visit("/login");
    cy.get("#signup").click();
    cy.location("pathname").should("equal", "/signup");
  });
});
