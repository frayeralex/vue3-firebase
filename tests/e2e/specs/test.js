// https://docs.cypress.io/api/introduction/api.html

describe("Hello world", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains(".brand-logo", "Vue + Firebase");
  });
});
