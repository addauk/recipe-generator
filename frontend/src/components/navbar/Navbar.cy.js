import React from "react";
import { mount } from "cypress/react18";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("renders the login button if the user is not logged in", () => {
    mount(<Navbar navigate={() => {}} />);
    cy.get('[data-cy="loginButton"]').should("exist");
    cy.get('[data-cy="logoutButton"]').should("not.exist");
  });

  it("navigates to the home page when the home button is clicked", () => {
    mount(<Navbar navigate={() => {}} />);
    cy.get('[data-cy="homeButton"]').click();
    cy.url().should("include", "/");
  });

  it("navigates to the login page when the login button is clicked", () => {
    mount(<Navbar navigate={() => {}} />);
    cy.get('[data-cy="loginButton"]').click();
    cy.wait(3000);
    cy.url().should("include", "/login");
  });

  it("renders the logout button if the user is logged in", () => {
    window.localStorage.setItem(
      "userData",
      JSON.stringify({ userName: "Test User", _id: "123" })
    );
    mount(<Navbar navigate={() => {}} />);
    cy.get('[data-cy="logoutButton"]').should("exist");
    cy.get('[data-cy="loginButton"]').should("not.exist");
  });

  it("logs out the user and navigates to the login page when the logout button is clicked", () => {
    window.localStorage.setItem(
      "userData",
      JSON.stringify({ userName: "Test User", _id: "123" })
    );
    mount(<Navbar navigate={() => {}} />);
    cy.get('[data-cy="logoutButton"]').click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="loginButton"]').should("exist");
    cy.get('[data-cy="logoutButton"]').should("not.exist");
    // expect(window.localStorage.getItem("token")).to.be.null;
    // expect(window.localStorage.getItem("userData")).to.be.null;
  });

  it("navigates to the user profile page when the profile button is clicked", () => {
    window.localStorage.setItem(
      "userData",
      JSON.stringify({ userName: "Test User", _id: "123" })
    );
    mount(<Navbar navigate={() => {}} />);
    cy.get('[data-cy="my-profile"]').click();
    cy.url().should("include", "/users/123");
  });
});
