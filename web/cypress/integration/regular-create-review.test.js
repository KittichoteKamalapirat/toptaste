const { isExportDeclaration } = require("typescript");

describe("regular user", () => {
  it("A regular user leave a review", () => {
    //go to home page
    cy.visit("http://localhost:3000");
    //sign in
    cy.findByRole("button", {
      name: /login/i,
    }).click();

    cy.findByRole("textbox", {
      name: /username or email/i,
    }).type("regular1");

    cy.findByLabelText(/password/i).type("regular1");

    cy.findByRole("button", {
      name: /sign in/i,
    }).click();
    // visit one restaurant

    cy.get('[data-test="restaurant-card-1"]').click();

    //click create review button

    cy.findByRole("button", {
      name: /create a review/i,
    }).click();

    //fill in review form
    //rating
    cy.get('[data-test="rating"]').click();

    // visited Date
    cy.findByRole("textbox", {
      name: /visited date/i,
    }).type("01/27/2022");

    cy.findByRole("textbox", {
      name: /description/i,
    }).type("definitely recommend");

    cy.findByRole("button", {
      name: /create/i,
    }).click();

    // verify if the latest review is created
    cy.get('[data-test="Latest Review Score"]').then((item) => {
      expect(item).to.contain(3.0);
    });
  });
});
