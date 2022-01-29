describe("admin", () => {
  it("Admin can create, edit, and delete a user", () => {
    //go to home page
    cy.visit("http://localhost:3000");

    //login
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

    //go to dashboard
    cy.findByRole("button", {
      name: /dashboard/i,
    }).click();
    //create a user
    cy.findByRole("button", {
      name: /add new user/i,
    }).click();

    cy.findByRole("textbox", {
      name: /username/i,
    }).type("testuser");

    cy.findByRole("textbox", {
      name: /email/i,
    }).type("testuser@gmail.com");

    cy.findByLabelText(/password/i).type("testuser");

    cy.findByRole("button", {
      name: /create/i,
    }).click();
    //redirected to dashboard

    // update a user
    cy.get('[data-test="edit user: testuser"]').click();
    cy.findByRole("textbox", {
      name: /email/i,
    })
      .clear()
      .type("testuser-updated@gmail.com");

    cy.findByRole("button", {
      name: /update/i,
    }).click();

    // delete a user
    cy.get('[data-test="delete user: testuser"]').click();
    cy.findByRole("button", {
      name: /delete/i,
    }).click();

    cy.findByRole("cell", {
      name: /testuser-updated@gmail\.com/i,
    }).should("not.exist");

    // expect(cy.findByText(/usertest/i)).to.exist;
    // cy.findByText(/successfully delete a user/i).then((item) => {
    //   // expect(item).to.contain("Please come and try!");
    //   expect(item).toBeInTheDocument();
    // });

    //delete that user
    //verify
  });
});
