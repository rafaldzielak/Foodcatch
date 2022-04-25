declare namespace Cypress {
  interface Chainable {
    login(): void;
    getInputWithPlaceholder(placeholder: string): Chainable<Element>;
    getButtonWithText(placeholder: string): Chainable<Element>;
    getElementByDataCy(dataCy: string): Chainable<Element>;
  }
}

const login = (): void => {};

const getInputWithPlaceholder = (placeholder: string) => {
  cy.get(`input[placeholder*="${placeholder}"]`);
};

const getButtonWithText = (text: string) => {
  cy.get("button").contains(text);
};

const getElementByDataCy = (dataCy: string) => {
  cy.get(`[data-cy=${dataCy}]`);
};

Cypress.Commands.add("login", login);
Cypress.Commands.add("getInputWithPlaceholder", getInputWithPlaceholder);
Cypress.Commands.add("getButtonWithText", getButtonWithText);
Cypress.Commands.add("getElementByDataCy", getElementByDataCy);
