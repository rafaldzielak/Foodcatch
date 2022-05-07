describe("Order", () => {
  beforeEach(() => {
    cy.visit("/menu");
    cy.findAllByText("Add to Order").first().click();
    cy.getButtonWithText("Continue").click();
  });

  let orderUrl = "";

  it("goes to correct url", () => {
    cy.url().should("equal", `${Cypress.config().baseUrl}order`);
  });

  it("renders correct content", () => {
    cy.findByText("Your Order").should("exist");
    cy.findByText("Your Address").should("exist");
    cy.getButtonWithText("Back to Menu").should("exist");
    cy.findByText("Comments On the Order").should("exist");
    cy.getButtonWithText("Apply Coupon").should("exist");
    cy.findByText(/Summary: /).should("exist");
    cy.getInputWithPlaceholder("Name").should("exist");
    cy.getInputWithPlaceholder("Surname").should("exist");
    cy.getInputWithPlaceholder("Email").should("exist");
    cy.getInputWithPlaceholder("Street").should("exist");
    cy.getInputWithPlaceholder("Street Number").should("exist");
    cy.getInputWithPlaceholder("Name").should("exist");
    cy.getInputWithPlaceholder("City").should("exist");
    cy.getInputWithPlaceholder("Phone").should("exist");
    cy.get("textarea").should("exist");
    cy.findByText("Cash").should("exist");
    cy.findByText("Card").should("exist");
    cy.getButtonWithText("Place Order");
  });

  it("Creates an order", () => {
    cy.getInputWithPlaceholder("Name").type("testName");
    cy.getInputWithPlaceholder("Surname").type("testSurname");
    cy.getInputWithPlaceholder("Email").type("testEmail@gmail.com");
    cy.getInputWithPlaceholder("Street").first().type("testStreet");
    cy.getInputWithPlaceholder("Street Number").type("testStreetNumber");
    cy.getInputWithPlaceholder("Name").type("testName");
    cy.getInputWithPlaceholder("City").type("testCity");
    cy.getInputWithPlaceholder("Phone").type("testPhone");
    cy.get("textarea").type("test Order Comment");
    cy.get(".payment-method").findByText("Cash").click();
    cy.getButtonWithText("Place Order").click();
    cy.url().should("contain", `${Cypress.config().baseUrl}summary/`);
    cy.url().then((url) => (orderUrl = url));
  });

  it("renders correct content on summary page", () => {
    cy.visit(orderUrl);
    cy.findByText("Payment").should("exist");
    cy.findByText("Your Order").should("exist");
    cy.getButtonWithText("Pay for Order").should("exist");
    cy.findByText("ID:").should("exist");
    cy.findByText(orderUrl.split("/").pop()).should("exist");
    cy.findByText("Phone:").should("exist");
    cy.findByText("testPhone").should("exist");
    cy.findByText("testNametestName testSurname").should("exist");
    cy.findByText("testCity").should("exist");
    cy.findByText("testEmail@gmail.com").should("exist");
    cy.findByText("testStreet testStreetNumber").should("exist");
    cy.findByText("Payment:").should("exist");
    cy.findByText("Cash").should("exist");
    cy.findByText("Order comments:").should("exist");
    cy.findByText("test Order Comment").should("exist");
  });

  it("order is seen on admin page", () => {
    cy.login();
    cy.visit("admin/orders");
    cy.findByText(orderUrl.split("/").pop());
  });

  // @TODO: Add coupon integration
});
