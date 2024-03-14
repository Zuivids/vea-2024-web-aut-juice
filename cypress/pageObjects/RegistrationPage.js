import { BasePage } from "../pageObjects/basePage";

export class RegistrationPage extends BasePage {
  static get url() {
    return "/#/register";
  }
  
  static get emailField(){
    return cy.get("#emailControl");
  }

  static get passwordField(){
    return cy.get("#passwordControl");
  }

  static get repeatPasswordField(){
    return cy.get("#repeatPasswordControl")
  }
  
  static get securityQuestion() {
    return cy.get(".security-container > * > * > .mat-form-field-flex.ng-tns-c22-16");
  }
  static get petOption() {
    return cy.get("#mat-option-9");
  }
  
  static get fillAnsear() {
    return cy.get("#securityAnswerControl");
  }

  static get registerButton() {
    return cy.get("#registerButton");
  }
  
}
