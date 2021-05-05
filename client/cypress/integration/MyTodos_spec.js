const baseUrl = 'http://localhost:3001';
const details = ['First name', 'Last name', 'Email', 'Password'];

const cypressUser = {
  firstName: 'Cypress_Firstname',
  lastName: 'Cypress_Lastname',
  email: 'Cypress_Test_@Email.com',
  password: 'Cypress_Test_Password',
}

describe('My First Test', () => {
  after(async () => {
    try {
      await fetch(`${baseUrl}/users/`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  });

  it('Tests MyTodos', () => {
    cy.visit('http://localhost:3000/');
    details.forEach((detail) => cy.contains(detail));

    //  Register
    cy.get('#firstNameRegister').type(cypressUser.firstName);
    cy.get('#lastNameRegister').type(cypressUser.lastName);
    cy.get('#emailRegister').type(cypressUser.email);
    cy.get('#passwordRegister').type(cypressUser.password);
    cy.get('button').contains('Register').click();

    //  Login
    cy.wait(600);
    cy.visit('http://localhost:3000/');
    cy.get('#emailLogin').type(cypressUser.email);
    cy.get('#passwordLogin').type(cypressUser.password);
    cy.get('button').contains('Login').click();

    //  New List
    cy.get('#addList')
      .click()
      .type('Cypress Test List')
      .type('{enter}');
    cy.get('#listItem').click();
    cy.contains('Cypress Test List');

    //  New Section
    cy.wait(300);
    cy.get('#sectionListControlButton').click();
    cy.get('#addSection').click();
    cy.get('#sectionName')
      .type('Cypress Test Section')
      .type('{enter}');
    cy.contains('Cypress Test Section');

    //  New Tasks
    cy.get('.AddTask__input').eq(0)
      .click()
      .type('Cypress Task 0')
      .type('{enter}');
    cy.contains('Cypress Task 0');

    cy.get('.AddTask__input').eq(1)
      .click()
      .type('Cypress Task 1')
      .type('{enter}');
    cy.contains('Cypress Task 1');

    cy.get('.AddTask__input').eq(1)
      .click()
      .type('Cypress Task 2')
      .type('{enter}');
    cy.contains('Cypress Task 2');

    //  Checking and un-Checking tasks
    cy.get('.Task__checkbox-wrap').eq(0)
      .click()
      .click();

    cy.get('.Task__checkbox-wrap').eq(1)
      .click()
      .click();

    cy.get('.Task__checkbox-wrap').eq(2)
      .click()
      .click();
  });
});
