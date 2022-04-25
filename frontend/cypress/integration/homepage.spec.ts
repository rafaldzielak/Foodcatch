describe("Homepage", () => {
  beforeEach(() => cy.login());

  it("loads correctly after login", () => {
    cy.visit("/");
    cy.url().should("equal", Cypress.config().baseUrl);
  });

  it("renders correct components", () => {
    cy.visit("/");
    cy.findByText("Order Happiness").should("exist");
    cy.findByText("Order Online").should("exist");
    cy.findByText("Book a Table").should("exist");
    // cy.title().should('contain', 'Teacher Section');
  });
});
