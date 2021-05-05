
const details = ['First name', 'Last name', 'Email', 'Password'];

const email = 'Cypress_Test_@Email.com'
const password = 'Cypress_Test_Password'

describe('My First Test', () => {

  after(() => {

  })

  it('Tests MyTodos', () => {
    cy.visit('http://localhost:3000/');
    details.forEach(detail => cy.contains(detail));

    cy.get('#emailLogin').type(email);
    cy.get('#passwordLogin').type(password);
    cy.get('button').contains('Login').click();

    cy.get('#addList')
      .click()
      .type('Cypress Test List')
      .type('{enter}');

  });
});
