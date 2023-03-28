describe("SignUpForm", () => {
    // beforeEach(() => {
    //   cy.visit("/signup");
    // });
  
    it("should render a sign-up form with fields for username, email, and password", () => {
      cy.visit("/signup");
      cy.get("#userName").should("exist");
      cy.get("#email").should("exist");
      cy.get("#password").should("exist");
    });
  
    it("should require all fields to be filled in before submitting the form", () => {
      cy.visit("/signup");
      cy.get("#submit").click();
      cy.url().should("contain", "/signup");
      cy.get(".error-message").should("exist");
      cy.get("#userName").type("testuser");
      cy.get("#email").type("testuser@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      cy.url().should("contain", "/login");
    });
  
    it("should navigate to the login page upon successful form submission", () => {
      cy.visit("/signup");
      cy.get("#userName").type("testuser");
      cy.get("#email").type("testuser@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      cy.url().should("contain", "/login");
    });
  
    it("should navigate to the homepage if a token is already present", () => {
      cy.visit("/signup");
      localStorage.setItem("token", "test-token");
      cy.reload();
      cy.url().should("contain", "/");
      localStorage.removeItem("token");
    });
  });