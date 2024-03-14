import { BasketPage } from "../pageObjects/BasketPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { SelectAddressPage } from "../pageObjects/SelectAdressPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { SavedAddressesPage } from "../pageObjects/SavedAdressesPage";
import {CreateAddressPage} from "../pageObjects/CreateAdressPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Click Login button
      HomePage.loginButton.click();
      // Set email value to "demo"
      LoginPage.emailField.type("demo");
      // Set password value to "demo"
      LoginPage.passwordField.type("demo");
      // Click Log in
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that "demo" account name appears in the menu section
      HomePage.profileMenuOption.should("contain","demo")

    });

    it("Registration", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Login button
      HomePage.loginButton.click();
      // Click "Not yet a customer?"
      LoginPage.register.click();
      // Find - how to generate random number in JS
      Math.round((Math.random() * 100) + 100)
      // Use that number to genarate unique email address, e.g.: email_7584@ebox.com
      const email = `email_${Math.round((Math.random() * 100) + 100)}@ebox.com`
      // Save that email address to some variable
      RegistrationPage.emailField.type(email);
      // Fill in password field and repeat password field with same password
      RegistrationPage.passwordField.type("Test1234test!");
      RegistrationPage.repeatPasswordField.type("Test1234test!");
      // Click on Security Question menu
      RegistrationPage.securityQuestion.click();
      // Select  "Name of your favorite pet?"
      RegistrationPage.petOption.click();
      // Fill in answer
      RegistrationPage.fillAnsear.type("Cat");
      // Click Register button
      RegistrationPage.registerButton.click();
      // Set email value to previously created email
      LoginPage.emailField.type(email);
      // Set password value to previously used password value
      LoginPage.passwordField.type("Test1234test!");
      // Click login button
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that account name (with previously created email address) appears in the menu section
      HomePage.profileMenuOption.should("contain",email);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Lemon
      HomePage.searchIcon.type("Lemon{enter}");
      // Select a product card - Lemon Juice (500ml)
      HomePage.selectProduct.contains("Lemon").click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.card.should("contain", "Sour but full of vitamins.");
    });

    // Create scenario - Search 500ml and validate Lemon, while having multiple cards
    it("Search 500ml and validate Lemon, while having multiple cards",() => {
    // Click on search icon
      HomePage.searchIcon.click();
    // Search for 500ml
      HomePage.searchIcon.type("500ml{enter}");
    // Select a product card - Lemon Juice (500ml)
      HomePage.selectProduct.contains("Lemon Juice (500ml)").click();
    // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.card.should("contain", "Sour but full of vitamins.");
    });
    

    // Create scenario - Search 500ml and validate cards
    it("Search 500ml and validate cards",() => {
    // Click on search icon
    HomePage.searchIcon.click();
    // Search for 500ml
    HomePage.searchIcon.type("500ml{enter}");
    // Select a product card - Eggfruit Juice (500ml)
    HomePage.selectProduct.contains("Eggfruit Juice (500ml)").click();
    // Validate that the card (should) contains "Now with even more exotic flavour."
    HomePage.card.should("contain", "Now with even more exotic flavour.");
    // Close the card
    HomePage.closeCard.click({force: true});
    // Select a product card - Lemon Juice (500ml)
    HomePage.selectProduct.contains("Lemon Juice (500ml)").click();
    // Validate that the card (should) contains "Sour but full of vitamins."
    HomePage.card.should("contain", "Sour but full of vitamins.");
    // Close the card
    HomePage.closeCard.click({force: true});
    // Select a product card - Strawberry Juice (500ml)
    HomePage.selectProduct.contains("Strawberry Juice (500ml)").click();
    // Validate that the card (should) contains "Sweet & tasty!"
    HomePage.card.should("contain", "Sweet & tasty!");

    });
    

    // Create scenario - Read a review
    it("Read a review",() => {
     // Click on search icon
     HomePage.searchIcon.click();
    // Search for King
    HomePage.searchIcon.type("King{enter}");
    // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
    HomePage.selectProduct.contains('OWASP Juice Shop "King of the Hill"').click();
    // Click expand reviews button/icon (wait for reviews to appear)
    cy.wait(500);
    HomePage.reviews.click();
    // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf! 
    HomePage.comments.filter(`:contains('K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!')`).should("exist");
    })
    

    // Create scenario - Add a review
    it("Add a review",() => {
    // Click on search icon
    HomePage.searchIcon.click();
    // Search for Raspberry
    HomePage.searchIcon.type("Raspberry{enter}");
    // Select a product card - Raspberry Juice (1000ml)
    HomePage.selectProduct.contains('Raspberry Juice (1000ml)').click();
    // Type in review - "Tastes like metal"
    cy.wait(500);
    HomePage.reviewInput.type("Tastes like metal");
    // Click Submit
    HomePage.submitReview.click();
    // Click expand reviews button/icon (wait for reviews to appear)
    cy.wait(500);
    HomePage.reviews.click();
    // Validate review -  "Tastes like metal"
    HomePage.comments.filter(`:contains('Tastes like metal')`).should("exist");
    });

    // Create scenario - Validate product card amount
    it("Validate product card amount",() => {
    // Validate that the default amount of cards is 12
    HomePage.selectCards.should("have.length",12);
    // Change items per page (at the bottom of page) to 24
    HomePage.cardsPerPage.click();
    HomePage.cardsPerPageOption.filter(`:contains('24')`).click();
    // Validate that the amount of cards is 24
    HomePage.selectCards.should("have.length",24);
    // Change items per page (at the bottom of page) to 36
    HomePage.cardsPerPage.click();
    HomePage.cardsPerPageOption.filter(`:contains('36')`).click();
    // Validate that the amount of cards is 35
    HomePage.selectCards.should("have.length",35);
    });
    // Create scenario - Buy Girlie T-shirt
    it("Buy Girlie T-shirt",() => {
    // Click on search icon
    HomePage.searchIcon.click();
    // Search for Girlie
    HomePage.searchIcon.type("Girlie{enter}");
    // Add to basket "Girlie"
    HomePage.addToBasket.click();
    // Click on "Your Basket" button
    HomePage.basketButton.click();
    // Create page object - BasketPage
    // Click on "Checkout" button
    BasketPage.buttonCheckout.click();
    // Create page object - SelectAddressPage
    // Select address containing "United Fakedom"
    SelectAddressPage.addreses.filter(`:contains('United Fakedom')`).click();
    // Click Continue button
    SelectAddressPage.buttonContinue.click();
    // Create page object - DeliveryMethodPage
    // Select delivery speed Standard Delivery
    DeliveryMethodPage.deliveryOptions.filter(`:contains('Standard Delivery')`).click();
    // Click Continue button
    DeliveryMethodPage.buttonContinue.click();
    // Create page object - PaymentOptionsPage
    // Select card that ends with "5678"
    PaymentOptionsPage.paymentOptions.filter(`:contains('************5678')`).get(`.mat-radio-button`).click();
    // Click Continue button
    PaymentOptionsPage.buttonContinue.click();
    // Create page object - OrderSummaryPage
    // Click on "Place your order and pay"
    OrderSummaryPage.checkoutButton.click();
    // Create page object - OrderCompletionPage
    // Validate confirmation - "Thank you for your purchase!"
    OrderCompletionPage.title.should("contain.text", "Thank you for your purchase!")
  });

    // Create scenario - Add address
    it.only("Buy Girlie T-shirt",() => {
    // Click on Account
    HomePage.accountButton.click();
    // Click on Orders & Payment
    HomePage.ordersButton.click();
    // Click on My saved addresses
    HomePage.savedAddressed.click();
    // Create page object - SavedAddressesPage
    // Click on Add New Address
    SavedAddressesPage.addButton.click();
    // Create page object - CreateAddressPage
    // Fill in the necessary information
    CreateAddressPage.country.type("Latvia");
      const name = "Some name here "
      CreateAddressPage.name.type(name);
      CreateAddressPage.mobileNumber.type("9999999999");
      CreateAddressPage.zipCode.type("LV-2602");
      CreateAddressPage.address.type("Bezmiega iela");
      CreateAddressPage.city.type("Ventspils");
    // Click Submit button
    CreateAddressPage.submitButton.click();
    // Validate that previously added address is visible
    SavedAddressesPage.addressed.filter(`:contains('${name}')`).should("exist");
  });

    // Create scenario - Add payment option
    // Click on Account
    // Click on Orders & Payment
    // Click on My payment options
    // Create page object - SavedPaymentMethodsPage
    // Click Add new card
    // Fill in Name
    // Fill in Card Number
    // Set expiry month to 7
    // Set expiry year to 2090
    // Click Submit button
    // Validate that the card shows up in the list
  });
});
