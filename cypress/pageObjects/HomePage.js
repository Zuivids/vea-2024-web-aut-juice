import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static get accountButton(){
    return  cy.get("button#navbarAccount")
  }

  static get loginButton(){
    return cy.get("button#navbarLoginButton");
  }

  static get profileMenuOption(){
    return cy.get("button[aria-label='Go to user profile']");
  }

  static get searchIcon(){
    return cy.get("#searchQuery");
  }

  static get selectProduct(){
    return cy.get(".item-name");
  }

  static get card(){
    return cy.get("mat-dialog-container");
  }

  static get closeCard(){
    return cy.get(".cdk-overlay-container .cdk-overlay-backdrop");
  }

  static get reviews(){
    return cy.get('[aria-label="Expand for Reviews"] > mat-expansion-panel-header');
  }

  static get comments(){
    return cy.get(".comment");
  }

  static get reviewInput(){
    return cy.get("textarea#mat-input-1");
  }

  static get submitReview(){
    return cy.get("#submitButton");
  }
}
