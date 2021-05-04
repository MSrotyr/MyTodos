import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import RegistrationForm from './RegistrationForm';
import { Register } from './RegistrationAPI';

const mockId = '6091169a9ade30f9b8d4ac86';

jest.mock('./RegistrationAPI.js', () => (
  {
    Register: jest.fn(),
  }
));

describe('Registration Form Tests', () => {
  let firstNameInput;
  let lastNameInput;
  let emailInput;
  let passwordInput;
  let registerBtn;
  let registrationHandler;

  beforeEach(async () => {
    registrationHandler = jest.fn();
    await act(async () => {
      render(<RegistrationForm registrationHandler={registrationHandler} />);

      firstNameInput = screen.getByPlaceholderText('First name');
      lastNameInput = screen.getByPlaceholderText('Last name');
      emailInput = screen.getByPlaceholderText('Email');
      passwordInput = screen.getByPlaceholderText('Password');
      registerBtn = screen.getByRole('button', 'submit');

      userEvent.type(firstNameInput, 'Bob');
      userEvent.type(lastNameInput, 'Marley');
      userEvent.type(emailInput, 'marley@email.com');
      userEvent.type(passwordInput, 'Marley123');
    });
  });

  it('Should call Register with the correct credentials', async () => {
    Register.mockImplementationOnce(() => (
      { message: 'Successfully created new user', _id: mockId }));
    await act(async () => {
      userEvent.click(registerBtn);
    });
    expect(registrationHandler).toHaveBeenCalledWith(mockId);
  });

  it('Should not register and alert the user if the registration fails', async () => {
    window.alert = jest.fn();
    Register.mockImplementationOnce(() => (
      { message: 'Cannot create user'}));
    await act(async () => {
      userEvent.click(registerBtn);
    });
    expect(registrationHandler).not.toHaveBeenCalledWith(mockId);
    expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
  });
});
