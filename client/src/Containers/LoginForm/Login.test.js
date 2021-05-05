import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import LoginForm from './LoginForm';
import { Login } from './LoginApi';

const mockId = '6091169a9ade30f9b8d4ac86';

jest.mock('./LoginApi.js', () => (
  {
    Login: jest.fn(),
  }
));

describe('Login Form Tests', () => {
  let emailInput;
  let passwordInput;
  let loginBtn;
  let loginHandler;

  beforeEach(async () => {
    loginHandler = jest.fn();
    await act(async () => {
      render(<LoginForm loginHandler={loginHandler} />);

      emailInput = screen.getByPlaceholderText('email');
      passwordInput = screen.getByPlaceholderText('password');
      loginBtn = screen.getByRole('button', 'submit');
      userEvent.type(emailInput, 'marley@email.com');
      userEvent.type(passwordInput, 'Marley123');
    });
  });

  it('Should call login with the correct credentials', async () => {
    Login.mockImplementationOnce(() => (
      { message: 'Successfully logged in', _id: mockId }));
    await act(async () => {
      userEvent.click(loginBtn);
    });
    expect(loginHandler).toHaveBeenCalledWith(mockId);
  });

  it('Should not login and alert the user if credentials are wrong', async () => {
    window.alert = jest.fn();
    Login.mockImplementationOnce(() => (
      { message: 'Cannot login' }));
    await act(async () => {
      userEvent.click(loginBtn);
    });
    expect(loginHandler).not.toHaveBeenCalledWith(mockId);
    expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
  });
});
