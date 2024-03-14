import { BasePage } from "../pageObjects/basePage";

export class PaymentOptionsPage extends BasePage {
  static get url() {
    return "/#/payment/shop";
  }

  static get paymentOptions() {
    return cy.get("mat-row");
  }
  
  static get buttonContinue() {
    return cy.get(`button[aria-label="Proceed to review"]`);
  }

}