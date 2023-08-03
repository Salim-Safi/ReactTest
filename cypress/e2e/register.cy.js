describe("Inscription", () => {
  it("Devrait afficher une erreur si le nom est trop court", () => {
    cy.visit("/register");
    cy.get("#name").type("T");
    cy.get("button[type=submit]").click();
    cy.get("div.alert.alert-warning").contains(
      "Votre nom doit comporter moins de 2 caractères"
    );
    cy.url().should("eq", Cypress.config().baseUrl + "/register");
  });

  it("Devrait rediriger vers la home si le formulaire est bien rempli", () => {
    cy.visit("/register");
    cy.get("#name").type("TestName");
    cy.get("#email").type("test@test.fr");
    cy.get("#password").type("12345678");
    cy.get("#country").select("FRANCE");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
