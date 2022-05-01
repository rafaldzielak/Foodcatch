describe("Menu", () => {
  beforeEach(() => {
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

  it("adds the item to basket", () => {
    cy.findAllByText("Add to Order").first().click();
    cy.findAllByText("Fried Calamari With Salsa Sauce").should("have.length.at.least", 2);
    cy.findByText(/Summary: /).should("exist");
    cy.getButtonWithText("Continue").should("exist");
  });

  it("switched between categories", () => {
    cy.findByText("Main Dishes").click();
    cy.findByText("Seared Scallops With Brown Butter and Lemon Pan Sauce").should("exist");
  });
});
