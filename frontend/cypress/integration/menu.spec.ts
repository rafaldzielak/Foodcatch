describe("Menu", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/menu");
  });

  it("goes to correct url after clicking the button on homepage", () => {
    cy.visit("/");
    cy.findByText("Order Online").click();
    cy.url().should("equal", `${Cypress.config().baseUrl}menu`);
  });

  it("renders correct content", () => {
    cy.findByText("Appetizers").should("exist");
    cy.findByText("Soups").should("exist");
    cy.findByText("Main Dishes").should("exist");
    cy.findByText("Desserts").should("exist");
    cy.findByText("Fried Calamari With Salsa Sauce").should("exist");
    cy.findAllByText("Add to Order").should("have.length.at.least", 1);
    cy.findAllByText(/zł/).should("have.length.at.least", 1);
    cy.findByText("Your Order").should("exist");
    cy.findByText("No items yet").should("exist");
  });
});
