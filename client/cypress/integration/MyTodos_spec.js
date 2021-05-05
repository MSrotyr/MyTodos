const testDetails = {
  'First name': 'Cypress_Test_Firstname',
  'Last name': 'Cypress_Test_Lastname',
  'Email': 'Cypress_Test_@Email.com',
  'Password': 'Cypress_Test_Password',
}

describe('My First Test', () => {

  it('Tests MyTodos', () => {
    cy.visit('http://localhost:3000/');
    Object.keys(testDetails).forEach(detail => cy.contains(detail));

    cy.get('#firstNameRegister').type(testDetails['First name'])
    cy.get('#lastNameRegister').type(testDetails['Last name'])
    cy.get('#emailRegister').type(testDetails['Email'])
    cy.get('#passwordRegister').type(testDetails['Password'])


  });
});
