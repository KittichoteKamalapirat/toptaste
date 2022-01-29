describe("admin", () => {
  it("Admin can create, edit, and delete a restaurant", () => {
    //go to home page
    cy.visit("http://localhost:3000");
    //sign in
    cy.findByRole("button", {
      name: /login/i,
    }).click();

    cy.findByRole("textbox", {
      name: /username or email/i,
    }).type("admin");

    cy.findByLabelText(/password/i).type("admin");

    cy.findByRole("button", {
      name: /sign in/i,
    }).click();

    //click add button
    cy.findByRole("button", {
      name: /add/i,
    }).click();

    //fill in the restaurant data and submit
    cy.findByRole("textbox", {
      name: /restaurant name/i,
    }).type("Japanese Italian Fusion Restaurant in Bangkok");

    cy.findByRole("textbox", {
      name: /description/i,
    }).type("The first Japanese Italian fusion food in town!!!");

    cy.findByRole("textbox", {
      name: /url image/i,
    }).type(
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    );

    cy.findByRole("button", {
      name: /create/i,
    }).click();

    //redirected to restaurant page
    //edit a restaurant
    cy.findByRole("button", {
      name: /edit this restaurant/i,
    }).click();

    cy.findByRole("textbox", {
      name: /description/i,
    }).type("Please come and try!");

    cy.findByRole("button", {
      name: /update/i,
    }).click();

    cy.get('[data-test="restaurant description"]').then((item) => {
      expect(item).to.contain("Please come and try!");
    });

    //delete a restaurant

    cy.findByRole("button", {
      name: /delete this restaurant/i,
    }).click();

    cy.findByRole("button", {
      name: /delete/i,
    }).click();
  });
});
