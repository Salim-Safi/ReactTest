describe("Home", () => {
  it("Devrait contenir des liens cliquables", () => {
    cy.visit("/");
    cy.contains("Utilisateurs");
    cy.contains("Compteur");
    cy.contains("Rôles");
    cy.contains("Inscrivez-vous").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/register");
  });
});
