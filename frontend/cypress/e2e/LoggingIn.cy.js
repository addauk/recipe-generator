describe("LogInForm component", () => {
    it("should navigate to /signup if there is no token", () => {
      cy.visit("/login");
      cy.location("pathname").should("equal", "/signup");
    });
  
    it("should show error message when login fails", () => {
      cy.visit("/login");
      cy.server();
      cy.route({
        method: "POST",
        url: "/tokens",
        status: 400,
        response: {},
      }).as("loginRequest");
  
      cy.get("#email").type("test@example.com");
      cy.get("#password").type("invalidpassword");
      cy.get("#submit").click();
  
      cy.wait("@loginRequest");
      cy.location("pathname").should("equal", "/login");
      cy.get("[role=alert]").should("be.visible");
    });
  
    it("should redirect to homepage when login succeeds", () => {
      cy.visit("/login");
      cy.server();
      cy.route({
        method: "POST",
        url: "/tokens",
        status: 201,
        response: { token: "test-token" },
      }).as("loginRequest");
  
      cy.get("#email").type("test@example.com");
      cy.get("#password").type("validpassword");
      cy.get("#submit").click();
  
      cy.wait("@loginRequest");
      cy.location("pathname").should("equal", "/");
      cy.get("[role=alert]").should("not.exist");
    });
  
    it("should navigate to signup page when signup button is clicked", () => {
      cy.visit("/login");
      cy.get("#signup").click();
      cy.location("pathname").should("equal", "/signup");
    });
  });