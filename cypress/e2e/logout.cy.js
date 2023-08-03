describe("Connexion Deconnexion", () => {
  it("Devrait se rendre sur la page connexion se connecter ensuite se déconnecter et vérifier que le boutton deconnexion n'est plus présent", () => {
    cy.visit("/login");
    cy.get("#login").type("test");
    cy.get("#password").type("12345678");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Déconnexion").click();
    cy.contains("Déconnexion").should("not.exist");
  });
});
